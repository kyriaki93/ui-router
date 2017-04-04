
app.factory('Dinner',['$firebaseArray',
  function($firebaseArray) {

	

	//alert function
	this.alerts = function(title, content){
		$.alert({
			title: title,
			content: content,
			animation: 'opacity',
			confirmButtonClass: 'btn-warning'
		});

	}

	
  return this;

}]);