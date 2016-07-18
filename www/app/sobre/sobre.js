angular.module('starter')
.controller('sobreCtrl',
['$state', '$scope', '$rootScope', 'PostService', '$location',
function ($state, $scope, $rootScope, PostService, $location) {

  $scope.go = function ( path ) {
    $location.path( path );
  };

  var localbusy = false;
  var items = [];
  $scope.finished = false;

  $scope.posts = [];

  $scope.nextPage = function() {
    console.log('nextPage called');
    if (localbusy)
    {
      return;
    } else {
      console.log(localbusy);
      localbusy = true;

      //console.log("events after = "+after)

      PostService.getSobre().then(function(response) {
        for (var i = 0; i < response.length; i++) {
          $scope.posts.push(response[i]);
        }

        if(response.length != 2){
          localbusy = false;
        } else {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.finished = true
        }
        console.log('response.length = ' + response.length);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  };

  $scope.doRefresh = function() {

    $scope.posts = [];
    $scope.finished = false;
    localbusy = false;

    console.log("refreshing");
    $scope.nextPage();
  };
  //$scope.nextPage();

}]);
