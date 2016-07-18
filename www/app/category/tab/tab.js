angular.module('starter')
.controller('tabCtrl',
['$state', '$scope', '$rootScope', 'PostService',
function ($state, $scope, $rootScope, PostService) {

  var localbusy = false;
  var items = [];
  $scope.finished = false;
  var after = 0;
  var term = $state.current.views[Object.keys($state.current.views)[0]].params.term;
  var cat = $state.current.views[Object.keys($state.current.views)[0]].params.cat;

  $scope.posts = [];

  $scope.nextPage = function() {
    console.log('nextPage called');
    if (localbusy)
    {
      return;
    } else {
      console.log(localbusy);
      localbusy = true;

      PostService.getAll(cat, term, after).then(function(response) {
        for (var i = 0; i < response.length; i++) {
          $scope.posts.push(response[i]);
        }
        after = after + response.length;

        if(response.length != 0){
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
    after = 0;

    console.log("refreshing");
    $scope.nextPage();
  };

  //$scope.nextPage();

}]);
