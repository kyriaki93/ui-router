
app.controller('userCtrl', function($scope, $state ) {
  
  
  //var auth = $firebaseAuth();


		$scope.submit = function(){

			  console.log("Klick funkar");

			  firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(res){

			  console.log('inloggad', res);
			  //window.location = 'http://kyriakis.se' + window.location.pathname + '#/project';
			  $state.transitionTo('dashboard.project', {arg:'arg'});

			  }).catch(function(error) {
  			  		// Handle Errors here.
  			  		var errorCode = error.code;
  			  		var errorMessage = error.message;

  			 		console.log(errorMessage);

  			 		title = "Error"
					content = error.message;

 
			});
		} 


		
});

