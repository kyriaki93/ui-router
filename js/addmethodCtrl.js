
app.controller('addmethodCtrl', function($scope, $state) {
  
		var ref = firebase.database().ref();
		var refMethod = firebase.database().ref('Methods');

		$scope.selectedOption = null;

		$scope.add = function(name, desc, materials, type, time, effort, group, longdesc){

			console.log(name);
			console.log(desc);
			console.log(materials);
			console.log(type);

			var date = Date();

			var newMethod = refMethod.push();

			newMethod.set({
    			name: name,
    			shortdesc: desc,
    			type : type,
    			materials: materials,
    			effort: effort,
    			time: time,
    			group: group,
    			longdesc: longdesc,
    			id: newMethod.key,
    			date: date
			});

			//window.location = 'http://kyriakis.se' + window.location.pathname + '#/toolkit';
			$state.transitionTo('dashboard.filter.toolkit', {type:'all'});

		} 
});


