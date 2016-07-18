angular.module('starter')
.controller('eventsCtrl',
['$state', '$scope', '$rootScope', 'PostService', '$location',
function ($state, $scope, $rootScope, PostService, $location) {

  $scope.go = function ( path ) {
    $location.path( path );
  };

  var localbusy = false;
  var items = [];
  $scope.finished = false;
  var after = 0;

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

      PostService.getAllEvents(after).then(function(response) {
        for (var i = 0; i < response.length; i++) {
          var date = response[i].postmetas.data_final;
          response[i].postmetas.data_final = new Date(date.slice(0,4), date.slice(4,6)-1, date.slice(6,8));

          var date = response[i].postmetas.data_inicio;
          response[i].postmetas.data_inicio = new Date(date.slice(0,4), date.slice(4,6)-1, date.slice(6,8));

          for (var j = 0; j < response[i].taxonomys.length; j++) {
            if (response[i].taxonomys[j].taxonomy == "language") {
              if (response[i].taxonomys[j].term_id == 492) {
                //term_id 492 is portuguese
                response[i].language = "pt";
              }
            }
          }


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
