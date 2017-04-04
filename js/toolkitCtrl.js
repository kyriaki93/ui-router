
app.controller('toolkitCtrl', function($scope) {
  	

  	// get methods from firebase
  	$scope.methods = [];
  	$scope.filtered = [];
  	$scope.selectedType = null;

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


});

  