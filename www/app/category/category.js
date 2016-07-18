angular.module('starter')
.controller('categoryCtrl',
['$state', '$scope', '$rootScope', '$location',
function ($state, $scope, $rootScope, $location) {

  $scope.right = false;
  $scope.left = false;

  $scope.index = 0;

  $scope.go = function ( path ) {
    console.log('Previous state:'+$rootScope.previousState)
    $location.path( path );
  };
  console.log('categoryCtrl');

  var scrollTabs = function(index){
    ionic.DomUtil.ready(function(){

      divwidth = angular.element(document).find('div.tab-nav').width();
      tabslength = angular.element(document).find('a.tab-item').length;
      finalwidth = window.innerWidth - (tabslength * 100);

      if((tabslength - index) < 2){
        console.log('(tabslength - index) < 2');
        angular.element(document).find('div.tab-nav').attr('style','transform: translate3d('+ finalwidth +'px, 0px, 0px);');
      } else if (index <= 2) {
        console.log('index <= 2');
        angular.element(document).find('div.tab-nav').attr('style','transform: translate3d(0px, 0px, 0px);');
      } else if (index > 2) {
        console.log('index > 2');
        angular.element(document).find('div.tab-nav').attr('style','transform: translate3d('+ (-100 * (index - 2)) +'px, 0px, 0px);');
      }

      console.log("divwidth = " + divwidth);
      console.log("window.innerWidth = " + window.innerWidth);
      console.log("finalwidth = " + finalwidth);
      console.log("active index = " + index);
      console.log("tabslength = " + tabslength);

    });
  }

  $scope.onArrowPress = function(direction){
    ionic.DomUtil.ready(function(){
      tabslength = angular.element(document).find('a.tab-item').length;

      if (direction == 'right'){
        if($scope.index < tabslength - 1){
          $scope.index = $scope.index + 1;
          scrollTabs($scope.index);
        }
      } else if (direction == 'left') {
        if($scope.index > 2){
          $scope.index = $scope.index - 1;
          scrollTabs($scope.index);
        }
      }

      console.log('$scope.index = '+$scope.index);


      if((tabslength - $scope.index) < 2){
        angular.element(document).find('div.arrow-right').addClass('hide');
        angular.element(document).find('div.arrow-left').removeClass('hide');
        $scope.right = false;
        $scope.left = true;
        console.log('(tabslength - index) < 2');
      } else if ($scope.index <= 2) {
        angular.element(document).find('div.arrow-right').removeClass('hide');
        angular.element(document).find('div.arrow-left').addClass('hide');
        $scope.right = true;
        $scope.left = false;
        console.log('index <= 2');
      } else if ($scope.index > 2) {
        angular.element(document).find('div.arrow-right').removeClass('hide');
        angular.element(document).find('div.arrow-left').removeClass('hide');
        $scope.right = true;
        $scope.left = true;
        console.log('index > 2');
      }

      console.log('$scope.right = '+$scope.right);
      console.log('$scope.left = '+$scope.left);
    });
  }

  $scope.onTabSelect = function(index){
    ionic.DomUtil.ready(function(){
      $scope.index = index;

      divwidth = angular.element(document).find('div.tab-nav').width();
      tabslength = angular.element(document).find('a.tab-item').length;
      finalwidth = window.innerWidth - (tabslength * 100);

      if ((tabslength > 2) && (finalwidth < 0)){
        angular.element(document).find('a.tab-item').addClass('custom-tab-item');
        angular.element(document).find('div.tab-nav').addClass('custom-tab-nav');
        angular.element(document).find('span.tab-title').addClass('custom-tab-title');


        scrollTabs(index);
        $scope.onArrowPress();

      }
    });
  };
}]);
