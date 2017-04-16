app.controller('dropdownCtrl', function($scope, $rootScope) {

  $scope.listVisible = false;
  $scope.isPlaceholder = true;                                 
                                  
  $scope.show = function() {
    event.stopPropagation();
    $scope.listVisible = !$scope.listVisible;
  };
  $scope.select = function(item) {
    $scope.selectedDate = item;
  };

  angular.element(document).on("click", function(e) {
    $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
                                  
  $rootScope.$on("documentClicked", function(inner, target) {

      if (!$(target[0]).is(".dropdown-display.activated") && !$(target[0]).parents(".dropdown-display.activated").length > 0)
          $scope.$apply(function() {
            $scope.listVisible = false;
          });
      });
                                         

    $scope.monthShowArray = [{
      'name': 'research',
      'date':'Research'
    },{
      'name': 'insight',
      'date':'Insight'
    },{
      'name': 'strategy',
      'date':'Strategy'
     },{
      'name': 'proof',
      'date':'Proof of Concept'
      },{
      'name': 'define',
      'date':'Define'
    },{
      'name': 'productdesign',
      'date':'Product Design'
      },{
      'name': 'other',
      'date':'Other'
       
    }]

});