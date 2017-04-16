
app.controller('toolkitCtrl', function($scope, $state, $stateParams, $rootScope) {
  	

  	// get methods from firebase
  	$scope.methods = [];
  	$scope.filtered = [];
  	$scope.selectedType = null;
 	$scope.myProjects = [];
   	var user = firebase.auth().currentUser;
	var creator = "";

	//get who is logged in
	if (user != null) {

	    user.providerData.forEach(function (profile) {

	        if(profile.displayName == null){

	            creator = profile.email;

	        }else{
	        	
	              creator= profile.displayName;
	        }

	    });

	}
	const dbRefObject = firebase.database().ref().child('Methods');

	dbRefObject.on('value', snap => {

		getAll = snap.val();

		for(var j in getAll){

			$scope.methods.push(getAll[j]);
			console.log($scope.methods);
		}

		if(!$scope.$$phase){

			$scope.$apply();
		}


	});


  	/* flter */

	$scope.filter = function(type){

			$scope.filtered = [];
			$scope.selectedType = type;

			for(var i in $scope.methods){

				if(type == $scope.methods[i].type ){

						$scope.filtered.push($scope.methods[i]);
						console.log($scope.filtered);
				}			
			}		
	}

	/* Clicked method*/
		$scope.gotomethod = function(id){

			console.log(id);
			$state.transitionTo('dashboard.method', {id:id});


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

			}
		
		}

	});



});

  