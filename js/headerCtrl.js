
app.controller('headerCtrl', function($scope) {

  var user = firebase.auth().currentUser;

// Hämta email från användare
  if (user != null) {

      user.providerData.forEach(function (profile) {

          if(profile.displayName == null){

              $scope.name = profile.email;

          }else{
              $scope.name = profile.displayName;
          }

          if(!$scope.$$phase){

              $scope.$apply();
              
          }

      })

  }else{
    $scope.name = 'no user';

  }


/* Menu toogle */ 

$(document).ready(

  $(".menu__item").click('.menu__link',function(e){
    $(".menu__item").removeClass("menu__item--current");
    $(this).addClass("menu__item--current");
  }));




	
});


