angular.module('starter')
.controller('sliderCtrl',
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

      PostService.getSlider().then(function(response) {
        for (var i = 0; i < response.length; i++) {
          if (!response[i].postmetas._thumbnail_id){
            response[i].postmetas._thumbnail_id = "";
          }
          $scope.posts.push(response[i]);
        }

        if(response.length == 0){
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
