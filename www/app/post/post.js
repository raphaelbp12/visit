angular.module('starter')
.controller('postCtrl',
['$state', '$scope', '$rootScope', 'PostService', '$location', '$stateParams', '$ionicHistory', '$ionicLoading', '$cordovaGeolocation', '$ionicNavBarDelegate', 'DeeplinkService',
function ($state, $scope, $rootScope, PostService, $location, $stateParams, $ionicHistory, $ionicLoading, $cordovaGeolocation, $ionicNavBarDelegate, DeeplinkService) {
  $scope.id = $stateParams.id;
  console.log($stateParams.id);

  $scope.title = "Carregando...";
  $scope.hasdate = false;
  $scope.posts = [];

  var localbusy = false;
  var items = [];
  $scope.finished = false;
  var after = 0;
  var expanded = false;

  $scope.loadmap = function() {
    console.log("loadmap");
    var options = {timeout: 10000, enableHighAccuracy: true};

      var latLng = new google.maps.LatLng($scope.posts[0].coordinates.lat, $scope.posts[0].coordinates.long);

      var mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        zoomControl: true
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
  }

  $scope.expandPostContent = function() {
    if(expanded){
      angular.element(document).find('div.post-content').removeClass('expanded');
      angular.element(document).find('div.post-content-expand').html('Ver mais <i style="margin-left: 6px" class="ion-chevron-down"></i>');
      expanded = false;
    } else {
      angular.element(document).find('div.post-content').addClass('expanded');
      angular.element(document).find('div.post-content-expand').html('Ver menos <i style="margin-left: 6px" class="ion-chevron-up"></i>');
      expanded = true;
    }
  }

  $scope.nextPage = function() {
    console.log('nextPage called');
    if (localbusy)
    {
      return;
    } else {
      console.log(localbusy);
      localbusy = true;

      //console.log("events after = "+after)

      PostService.getById($scope.id).then(function(response) {
        for (var i = 0; i < response.length; i++) {

          if (response[i].postmetas.data_final) {
            $scope.hasdate = true;
          }

          response[i].content = response[i].content.replace(/<hr/i, "<br><br");

          $scope.posts.push(PostService.filterResponse(response[i]));
        }


        after = after + response.length;

        if(response.length != 1){
          localbusy = false;
        } else {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.finished = true
          $scope.title = $scope.posts[0].title
        }
        console.log('response.length = ' + response.length);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
        //$scope.loadmap();
      });
    }
  };
  $scope.doRefresh = function() {

    $scope.posts = [];
    $scope.finished = true;
    localbusy = false;

    console.log("refreshing");
    $scope.nextPage();
  };
  //$scope.nextPage();

  $scope.openMoovit = function() {
    DeeplinkService.getUserCoords().then(function(coords){
      DeeplinkService.openTargetMoovit(coords, $scope.posts[0]);
    });    
  }

}]);
