
app.controller('getUserCtrl', function($scope, $state) {
  
  
var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
  	$scope.username = profile.displayName;
  	$scope.profileURL = profile.photoURL;

		if(!$scope.$$phase){

			$scope.$apply();
		}

    console.log("  Name: "+profile.displayName);
    console.log("  Photo URL: "+profile.photoURL);
  });
}

$scope.update = function(username, profileURL){


	user.updateProfile({
	  displayName: username,
	  photoURL: profileURL
	}).then(function() {

		$scope.username = username;
  		$scope.profileURL = profileURL;
  		var displayName = username;
  		var photoURL = profileURL;
		$state.reload();

	}, function(error) {
	  // An error happened.
	});

	if(!$scope.$$phase){

		$scope.$apply();
	}
	
}
		
});

  