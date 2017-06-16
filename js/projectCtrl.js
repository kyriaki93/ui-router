
app.controller('projectCtrl',function($scope, $state, $stateParams) {
 
  	$scope.projects = [];
	const dbRefObject = firebase.database().ref().child('Projects');
	var user = firebase.auth().currentUser;
	var creator = "";
	$scope.typ = $stateParams.type;

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



					//console.log($stateParams.type);
				if( ($stateParams.type == getAll[j].type) ) {

					//filtrera på projekttyp
					$scope.projects.push(getAll[j]);


				}else if(($stateParams.type == 'all')){

					//Alla projekt
					$scope.projects.push(getAll[j]);

				}else if( $stateParams.type == 'myprojects' ){

					//Mina projekt
					//Split name of the one who is logged in
    				var splittedName = (creator).toLowerCase().split(" ");

    				// show my projects (either if you are the creator of the project or just a fellow designer)
					if(getAll[j].creator == creator || String((getAll[j].designers).toLowerCase().split(" ")).match(String(splittedName)) ){
						$scope.projects.push(getAll[j]);
						

					}
				}


		}

		if(!$scope.$$phase){

			$scope.$apply();
		}
	});



	/* Clicked project*/
		$scope.gotoproject = function(id){

			$state.transitionTo('dashboard.projectfilter.thisproject', {id:id});


		}

});