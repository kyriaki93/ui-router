
app.controller('singleprojectCtrl', function($scope, $state, $stateParams, $rootScope, $window) {
  	
	$scope.timelineAll = [];
	$scope.timelineTodo = [];
	$scope.timelineDoing = [];
	$scope.timelineDone = [];
	$scope.allMethods = [];
  	$scope.selectedType = null;
  	var user = firebase.auth().currentUser;
	var creator = "";
	var creatorImg = 'no image';
	$scope.timelineId = null;
	$scope.header = 'Add activity';
	$scope.checkCreator = "";

	//get who is logged in
	if (user != null) {

	    user.providerData.forEach(function (profile) {

	        if(profile.displayName == null){

	            creator = profile.email;
	            creatorImg = profile.photoURL;



	        }else{
	        	
	              creator= profile.displayName;
	              creatorImg = profile.photoURL;
	              $scope.checkCreator= profile.displayName;


	        }

	    });

	}


	// get timeline
	const timeRefObject = firebase.database().ref().child('Timeline');

	timeRefObject.on('value', snap => {

		timeline = snap.val();

		for(var j in timeline){

			$scope.timelineAll.push(timeline[j]);

			//depending on what status the activity has --> but in differnet lists
			if( timeline[j].status == 'todo' && timeline[j].projectid == $stateParams.id ){

				$scope.timelineTodo.push(timeline[j]);

			}else if( timeline[j].status == 'doing' && timeline[j].projectid == $stateParams.id ){

				$scope.timelineDoing.push(timeline[j]);
			}
			else if(timeline[j].status == 'done' && timeline[j].projectid == $stateParams.id ){

				$scope.timelineDone.push(timeline[j]);

			}

		}

		if(!$scope.$$phase){

			$scope.$apply();
		}


	});	

	//POPUP 1
	(function() {
		var dialog = new DialogEl(document.getElementById('dialog-1'), {
			mainElement : {
				minscale : 0.6,
				minopacity : 0.5,
				//rX : 30,
				rY : 40
			},
			innerElements : {tx : 100, ty : 100},
			// the element is considered out of bounds if its center (x,y) is either 
			// x < outofbounds.x or x > win.width-outofbounds.x or
			// y < outofbounds.y or y > win.height - outofbounds.y
			outofbounds: {x : 0, y: 0}
		});

		$(".dialog").css("z-index","-99999");

		$scope.click = function(id){

			$(".dialog").css("z-index","99999");
			$("body").css("overflow","hidden");

			$scope.timelineId = id;

			if($scope.timelineId != null){

				for(x in $scope.timelineAll){

					if($scope.timelineId == $scope.timelineAll[x].id){
						$scope.header = $scope.timelineAll[x].methodname;
						$scope.status = $scope.timelineAll[x].status;

						if($scope.timelineAll[x].insight == false){

							$scope.insights = '';
						}
						else if(creator == $scope.timelineAll[x].creator){

							$scope.insights = $scope.timelineAll[x].insight;

						}else{

							$scope.insights = '';

						}
					}
				}

			}else{

				$scope.header = 'Add activity';
				$scope.insights = '';
				$scope.status = 'todo';
			}

			if(!$scope.$$phase){

				$scope.$apply();
			}

			dialog.open();
		}

		$(".dialog").css("z-index","-99999");
		$("body").css("overflow-x","hidden");


	})();

	$scope.close = function(){

		$state.reload();
	}


  	// get project from firebase
	const dbRefObject = firebase.database().ref().child('Projects');

	dbRefObject.on('value', snap => {

		getAll = snap.val();

		//Loop trough methods
		for(var j in getAll){

			//Find the clicked method
			if( $stateParams.id == getAll[j].id){

				$scope.projectname = getAll[j].name;
				$scope.brief = getAll[j].brief;
				$scope.deliverables = getAll[j].deliverables;
				$scope.designers = getAll[j].designers;
				$scope.creator = getAll[j].creator;
				$scope.type = getAll[j].type;

			}
		}

		if(!$scope.$$phase){

			$scope.$apply();
		}


	});


	//get methods
	const mRefObject = firebase.database().ref().child('Methods');

	mRefObject.on('value', snap => {

		getMethods = snap.val();

		//Loop trough methods
		for(var j in getMethods){

			$scope.allMethods.push(getMethods[j]);
		}


	});

	//Scroll timeline
    $(".scroll").click(function (event) {
        var current = $('.timeline').scrollLeft();
        var left = $(this.hash).position().left;        

        event.preventDefault();

        $('.timeline').animate({
            scrollLeft: current + left
        }, 200);


    });

    //drag timeline
    $('div#arrowL').click(function(){
          
          $('.timeline').animate({'left':'+=300px'});
          $(".timeline").css("overflow-x","visible");
          console.log('click');

       
    });


    $('div#arrowR').click(function(){
          
          $('.timeline').animate({'left':'-=300px'});
          $(".timeline").css("overflow-x","visible");
                    console.log('click');

       
    });


		//Add a new activiry to timeling

		var refTimeline = firebase.database().ref('Timeline');

		$scope.addTimeline = function(methodname, status, insight){


			$scope.methodid = "";

			for(var i in $scope.allMethods){

				if(methodname == $scope.allMethods[i].name ){
						$scope.methodid = $scope.allMethods[i].id;
				}
			}

			if(insight == undefined){
				var insight = false;
			}



			var newTimeline = refTimeline.push();

			newTimeline.set({
    			creator: creator,
    			creatorImg: creatorImg,
    			insight: insight,
    			methodid: $scope.methodid,
    			methodname: methodname,
    			projectid: $stateParams.id,
    			projectname: $scope.projectname,
    			status: status,
    			id: newTimeline.key
			});

			$state.reload();


		}

		//Edit activity to timeline
		$scope.edit = function(status, insight){


			for(y in $scope.timelineAll){

				if($scope.timelineId == $scope.timelineAll[y].id){
					var methodid = $scope.timelineAll[y].methodid;
					var timelineCreator = $scope.timelineAll[y].creator;
				}
				

			}

			console.log(methodid);

			if(insight == undefined){
				var insight = false;
			}


			if(creator == timelineCreator){
				firebase.database().ref('Timeline/' + $scope.timelineId).set({
	    			creator: creator,
	    			insight: insight,
	    			methodid: methodid,
	    			methodname: $scope.header,
	    			projectid: $stateParams.id,
	    			projectname: $scope.projectname,
	    			creatorImg: creatorImg,


	    			//updated values
				    status: status,
				    insight: insight,
				    id: $scope.timelineId
				});
			}else{
				var newInsight = refTimeline.push();

				newInsight.set({
	    			creator: creator,
	    			insight: insight,
	    			methodid: methodid,
	    			methodname: $scope.header,
	    			projectid: $stateParams.id,
	    			projectname: $scope.projectname,
	    			creatorImg: creatorImg,

	    			status: status,
	    			id: newInsight.key
				});	
			}

			$state.reload();

		}

		//delete activity
		$scope.delete = function(){


	  		var DeleteActivity =  new firebase.database().ref('Timeline/' + $scope.timelineId)
	  		DeleteActivity.remove();

	  		$state.reload();

		};



		

		//dropdown menu (shows my projects)
		$scope.listVisible = false;
		$scope.isPlaceholder = true;                                 
		                                  
		$scope.show = function() {
		    event.stopPropagation();
		    $scope.listVisible = !$scope.listVisible;
		};
		
		$scope.select = function(item) {
		    $scope.selectedDate = item;
		};

		angular.element(document).on("click", function(e) {
		    $rootScope.$broadcast("documentClicked", angular.element(e.target));
		});
		                                  
		$rootScope.$on("documentClicked", function(inner, target) {

		      if (!$(target[0]).is(".dropdown-display.activated") && !$(target[0]).parents(".dropdown-display.activated").length > 0)
		          $scope.$apply(function() {
		            $scope.listVisible = false;
		          });
		});
		                                         
});


