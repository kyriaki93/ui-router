
app.controller('addprojectCtrl', function($scope, $state) {
  
  		//Firebase
		var ref = firebase.database().ref();
		var refMethod = firebase.database().ref('Projects');
		var user = firebase.auth().currentUser;

		$scope.selectedOption = null;
		var creator = "";
		var deliverables = "";

		$scope.add = function(projectname, designers, type, brief){

			//Decide deliverable depending on type
			if(type == 'research'){

				var deliverables = "The research deliverables";

			}else if(type == 'concept'){

				var deliverables = "The concept deliverables";

			}else if(type == 'productdesign'){

				var deliverables = "The product design deliverables";

			}

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

			var newMethod = refMethod.push();

			newMethod.set({
    			name: projectname,
    			type : type,
    			designers: designers,
    			creator: creator,
    			deliverables: deliverables,
    			brief: brief,
    			id: newMethod.key
			});

			//window.location = 'http://kyriakis.se' + window.location.pathname + '#/project';
			$state.transitionTo('dashboard.project', {});

		} 
});


