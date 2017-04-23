
app.controller('projectCtrl',function($scope, $state) {
 
  	$scope.projects = [];
  	$scope.filtered = [];
  	$scope.myprojects = [];
  	$scope.selectedType = 'myprojects';

	const dbRefObject = firebase.database().ref().child('Projects');

	var user = firebase.auth().currentUser;

	var creator = "";

	//get which user is logged in
	if (user != null) {

	    user.providerData.forEach(function (profile) {

	        if(profile.displayName == null){

	            creator = profile.email;

	        }else{
	        	
	            creator= profile.displayName;
	        }

	    });

	}


	dbRefObject.on('value', snap => {

		getAll = snap.val();

		for(var j in getAll){

			$scope.projects.push(getAll[j]);

				if( $scope.selectedType == 'myprojects'){

					//Split name of the one who is logged in
    				var splittedName = (creator).toLowerCase().split(" ");

    				// show my projects (either if you are the creator of the project or just a fellow designer)
					if(getAll[j].creator == creator || String((getAll[j].designers).toLowerCase().split(" ")).match(String(splittedName)) ){
						$scope.filtered.push(getAll[j]);
						

					}
				}

		}



		if(!$scope.$$phase){

			$scope.$apply();
		}
	});


  	/* flter */

	$scope.filter = function(type){

			$scope.filtered = [];
			$scope.selectedType = type;

			for(var i in $scope.projects){


				if( (type == $scope.projects[i].type) ) {

						$scope.filtered.push($scope.projects[i]);
						
						if(!$scope.$$phase){

							$scope.$apply();
						}

				}
				if( type == 'myprojects'){

					//Split name of the one who is logged in
    				var splittedName = (creator).toLowerCase().split(" ");

    				console.log(String($scope.projects[i].designers.split(" ")).match(String(splittedName)));
    				console.log( 'lista', String($scope.projects[i].designers.split(" ")));
    				console.log( 'inloggad', splittedName);

    				// show my projects (either if you are the creator of the project or just a fellow designer)
					if($scope.projects[i].creator == creator || String(($scope.projects[i].designers).toLowerCase().split(" ")).match(String(splittedName)) ){
						$scope.filtered.push($scope.projects[i]);
						
						if(!$scope.$$phase){

							$scope.$apply();
						}
					}
				}

	
			}
	
	}

	/* Clicked project*/
		$scope.gotoproject = function(id){

			$state.transitionTo('dashboard.thisproject', {id:id});


		}

});