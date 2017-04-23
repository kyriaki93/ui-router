
app.controller('singlemethodCtrl', function($scope, $state, $stateParams, $rootScope) {
  	

  	$scope.selectedType = null;
  	$scope.insights = []
  	$scope.usedInProjects = []
 	allMethods = [];
 	$scope.myProjects = [];
   	var user = firebase.auth().currentUser;
	var creator = 'no user';
	$scope.creatorImg = 'no img';



	//get who is logged in
	if (user != null) {

	    user.providerData.forEach(function (profile) {

	        if(profile.displayName == null){

	            creator = profile.email;
	            $scope.creatorImg = profile.photoURL;

	        }else{
	        	
	            creator= profile.displayName;
	            $scope.creatorImg = profile.photoURL;
	        }

			if(!$scope.$$phase){

				$scope.$apply();
			}

	    });

	}

  	// get methods from firebase
	const dbRefObject = firebase.database().ref().child('Methods');

	dbRefObject.on('value', snap => {

		getAll = snap.val();



		//Loop trough methods
		for(var j in getAll){

			//put all methods in a list
			allMethods.push(getAll[j]);

			//Find the clicked method
			if( $stateParams.id == getAll[j].id){

				$scope.methodname = getAll[j].name;
				$scope.longdesc = getAll[j].longdesc;
				$scope.materials = getAll[j].materials;
				$scope.type = getAll[j].type;
				$scope.time = getAll[j].time;
				$scope.group = getAll[j].group;
				$scope.effort = getAll[j].effort;

			}
		}

		if(!$scope.$$phase){

			$scope.$apply();
		}


	});

	//Get insights from timelimg
	const tRefObject = firebase.database().ref().child('Timeline');

	tRefObject.on('value', snap => {

		getTimeline = snap.val();
		$scope.insights = [];
		$scope.profileImgages = [];

		//Loop trough methods
		for(var i in getTimeline){

			//Find the clicked method
			if( $stateParams.id == getTimeline[i].methodid && getTimeline[i].insight != false ){

				$scope.insights.push(getTimeline[i]);


			}
			if($stateParams.id == getTimeline[i].methodid){
				$scope.usedInProjects.push(getTimeline[i]);
				$scope.used = $scope.usedInProjects.length;
			}
		}

		if(!$scope.$$phase){

			$scope.$apply();
		}


	});

	//Läsa in de projekt från den som är inloggad!
	const projRefObject = firebase.database().ref().child('Projects');

	projRefObject.on('value', snap => {

		getAllProjects = snap.val();

		//Loop trough projects
		for(var a in getAllProjects){

			//Find the clicked method

			if( creator == getAllProjects[a].creator){

				$scope.myProjects.push(getAllProjects[a]);

			}else if(creator == 'no user'){
				$scope.myProjects.push(getAllProjects[a]);
			}
		
		}

	});

	//POPUP
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

		document.getElementById('trigger-dialog').addEventListener('click', function(ev) {
			dialog.open();
		});
	})();

	//Add chosen method to a chosen project in 'Timeline'
	var refTimeline = firebase.database().ref('Timeline');

	$scope.addTimeline = function(projectname, status, getInsight){


		var methodid = "";
		var projectid = "";

		//ta fram rätt ID för metod och lägga i databasen
		for(var i in allMethods){

			if($scope.methodname == allMethods[i].name ){
					methodid = allMethods[i].id;
			}
		}

		for(var b in $scope.myProjects){

			 if(projectname == $scope.myProjects[b].name){
			 	projectid = $scope.myProjects[b].id
			 }
		}

		console.log(getInsight);
		//Kolla om insight är undifiend och i så fall kalla den false så länge
		if(getInsight == undefined){
			var getInsight = false;
		}



		var newTimeline = refTimeline.push();

		newTimeline.set({
			creator: creator,
			creatorImg: $scope.creatorImg,
			insight: getInsight,
			methodid: methodid,
			methodname: $scope.methodname,
			projectid: projectid,
			projectname: projectname,
			status: status,
			id: newTimeline.key
		});

		$state.reload();


	}


	//Dropdown (läser in projektalternativ)
    $scope.listVisible = false;
    $scope.isPlaceholder = true;                                 
    
    console.log($scope.selectedDate);
                           
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