
app.controller('filterCtrl', function($scope, $state, $stateParams, $rootScope, $document, $location) {
  	

  	// get methods from firebase
  	$scope.methods = [];
  	$scope.filtered = [];
 	$scope.myProjects = [];
   	var user = firebase.auth().currentUser;
	var creator = "";
	$scope.creatorImg = 'no img';

	//console.log($location.path());

	if($location.path() == '/dashboard/project/myprojects'){

		$('#myprojects ').addClass( "active" );

	}else{

		$('#all ').addClass( "active" );

	}
			
	$scope.active = function (type) {
		if(type == 'all'){
			$('#all ').addClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#other" ).removeClass( "active" );
			$( "#myprojects" ).removeClass( "active" );
			$( "#concept" ).removeClass( "active" );


		}else if(type == 'research'){
			$('#research ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#other" ).removeClass( "active" );
			$( "#myprojects" ).removeClass( "active" );
			$( "#concept" ).removeClass( "active" );

		}else if(type == 'insight'){
			$('#insight ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#other" ).removeClass( "active" );

		}else if(type == 'strategy'){
			$('#strategy ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#other" ).removeClass( "active" );

		}else if(type == 'proof'){
			$('#proof ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#other" ).removeClass( "active" );
		
		}else if(type == 'define'){
			$('#define ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#other" ).removeClass( "active" );
			
		}else if(type == 'productdesign'){
			$('#productdesign ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#other" ).removeClass( "active" );
			$( "#concept" ).removeClass( "active" );

		}else if(type == 'other'){
			$('#other ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
		
		}else if(type == 'myprojects'){
			$('#myprojects ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#concept" ).removeClass( "active" );
		
		}else if(type == 'concept'){
			$('#concept ').addClass( "active" );
			$( "#all" ).removeClass( "active" );
			$( "#research" ).removeClass( "active" );
			$( "#insight" ).removeClass( "active" );
			$( "#strategy" ).removeClass( "active" );
			$( "#productdesign" ).removeClass( "active" );
			$( "#define" ).removeClass( "active" );
			$( "#proof" ).removeClass( "active" );
			$( "#myprojects" ).removeClass( "active" );

		}
	}


});


  