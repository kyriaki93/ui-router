
app.controller('projectCtrl',function($scope, $state) {
 
  	$scope.projects = [];
  	$scope.filtered = [];
  	$scope.selectedType = 'myprojects';

	const dbRefObject = firebase.database().ref().child('Projects');

	var user = firebase.auth().currentUser;

	var creator = "";

	//get which user is logged in
	if (user != null) {

		creator = user.email;

	}

	dbRefObject.on('value', snap => {

		getAll = snap.val();

		for(var j in getAll){

			$scope.projects.push(getAll[j]);
			console.log($scope.projects);
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
						console.log($scope.filtered);

				}
				if( type == 'myprojects'){

					if($scope.projects[i].creator == creator ){
						$scope.filtered.push($scope.projects[i]);
						console.log($scope.filtered);
					}
				}
	
			}		
	}

	/* Clicked project*/
		$scope.gotoproject = function(id){

			console.log(id);
			$state.transitionTo('dashboard.thisproject', {id:id});


		}

});