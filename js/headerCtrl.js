
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
  }))




/*
(function() {
[].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
var menuItems = menu.querySelectorAll('.menu__link'),
setCurrent = function(ev) {
ev.preventDefault();
var goTo = this.getAttribute('href');
setTimeout(function() {
window.location = goTo;
},300);
var item = ev.target.parentNode; // li
// return if already current
if (classie.has(item, 'menu__item–-current')) {
return false;
}
// remove current
classie.remove(menu.querySelector('.menu__item–-current'), 'menu__item–-current');
// set current
classie.add(item, 'menu__item–-current');
};
[].slice.call(menuItems).forEach(function(el) {
el.addEventListener('click', setCurrent);
});
});


})(window);
*/
/*
    (function() {
      [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
        var menuItems = menu.querySelectorAll('.menu__link'),
          setCurrent = function(ev) {
            ev.preventDefault();

            var item = ev.target.parentNode; // li

            // return if already current
            if (classie.has(item, 'menu__item--current')) {
              return false;
            }
            // remove current
            classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
            // set current
            classie.add(item, 'menu__item--current');
          };

        [].slice.call(menuItems).forEach(function(el) {
          el.addEventListener('click', setCurrent);
        });
      });

      [].slice.call(document.querySelectorAll('.link-copy')).forEach(function(link) {
        link.setAttribute('data-clipboard-text', location.protocol + '//' + location.host + location.pathname + '#' + link.parentNode.id);
        new Clipboard(link);
        link.addEventListener('click', function() {
          classie.add(link, 'link-copy--animate');
          setTimeout(function() {
            classie.remove(link, 'link-copy--animate');
          }, 300);
        });
      });
              $(document).ready(function(){
$('.menu__list li').click(function(){
$(this).addClass('menu__item–current');
$(this).siblings().removeClass('menu__item–current');
})
});
    })(window);
*/
	
});


