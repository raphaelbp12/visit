angular.module('starter')
.controller('homeCtrl',
['$state', '$scope', '$rootScope', 'PostService', '$ionicSlideBoxDelegate', 'DeeplinkService',
function ($state, $scope, $rootScope, PostService, $ionicSlideBoxDelegate, DeeplinkService) {

  $scope.posts = [];

  $scope.openMoovit = function() {
    DeeplinkService.getUserCoords().then(function(coords){
      DeeplinkService.openSelfMoovit(coords);
    });
  }

  PostService.getSlider().then(function(response) {
    for (var i = 0; i < response.length; i++) {
      if (!response[i].postmetas._thumbnail_id){
        response[i].postmetas._thumbnail_id = "";
      }
      console.log(response[i].postmetas._thumbnail_id);
      $scope.posts.push(response[i]);
    }
    $ionicSlideBoxDelegate.update();
    console.log('$ionicSlideBoxDelegate.update()');
  });
  console.log('home');
}]);
