
app.controller('toolkitCtrl', function($scope, $state, $stateParams, $rootScope, $document, $location) {
  	

  	// get methods from firebase
  	$scope.methods = [];
  	$scope.typ = $stateParams.type;
 	$scope.myProjects = [];
   	var user = firebase.auth().currentUser;
	var creator = "";
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

	    });

	}

	//get methods
	const dbRefObject = firebase.database().ref().child('Methods');

	dbRefObject.on('value', snap => {


		getAll = snap.val();

		for(var j in getAll){

			if($stateParams.type == 'all'){

				$scope.methods.push(getAll[j]);
				console.log($scope.methods);

			}else if( (getAll[j].type == $stateParams.type) ){

				$scope.methods.push(getAll[j]);
				console.log($scope.methods);


			}


		}

		if(!$scope.$$phase){

			$scope.$apply();
		}


	});


	/* Clicked method*/
		$scope.gotomethod = function(id){

			console.log(id);
			$state.transitionTo('dashboard.filter.method', {id:id, type: $stateParams.type});


		}


	//Läsa in de projekt från den som är inloggad!
	const projRefObject = firebase.database().ref().child('Projects');
			console.log(creator);

	projRefObject.on('value', snap => {

		getAllProjects = snap.val();

		console.log(getAllProjects);

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
		var dialog = new DialogEl( document.getElementById('dialog-1'), {
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

		$scope.addMethodToolkit = function(id){

			$(".dialog").css("z-index","99999");
			$("body").css("overflow","hidden");

			console.log(id);

			//Hämta id och få ut metod namn

			for(m in $scope.methods){

				if($scope.methods[m].id == id){

					$scope.methodname = $scope.methods[m].name;
				}

			}

			dialog.open();
		};

		$(".dialog").css("z-index","-99999");
		$("body").css("overflow-x","hidden");

	})();

	//Add chosen method to a chosen project in 'Timeline'
	var refTimeline = firebase.database().ref('Timeline');

	$scope.addTimeline = function(projectname, status, getInsight){


		var methodid = "";
		var projectid = "";

		//ta fram rätt ID för metod och lägga i databasen
		for(var i in $scope.methods){

			if($scope.methodname == $scope.methods[i].name ){
					methodid = $scope.methods[i].id;
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
	//När popupen stängts
	$scope.closePopupToolkit = function(){
		console.log('stängt');
		$state.reload();
	}

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


  