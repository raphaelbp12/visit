angular.module('starter').service('DeeplinkService', ['Restangular', '$cordovaGeolocation' ,'$cordovaAppAvailability', '$q',
function(Restangular, $cordovaGeolocation, $cordovaAppAvailability, $q){

  this.getUserCoords = function(){
    var deferred = $q.defer();

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    var coords = {
      'lat': 0,
      'long': 0
    };
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        coords.lat  = position.coords.latitude
        coords.long = position.coords.longitude
        console.log(coords);
        deferred.resolve(coords);
      }, function(err) {
        console.log(err);
        deferred.resolve(false);
        // error
      });

      return deferred.promise;
  }

  this.openSelfMoovit = function(usercoords){

    var scheme = '';
    if(ionic.Platform.isIOS()) {
        scheme = 'moovit://';
    }
    else if(ionic.Platform.isAndroid()) {
        scheme = 'com.tranzmate';
    }

    $cordovaAppAvailability.check(scheme) // URI Scheme
    .then(function() {  // Success callback
      //console.log('Moovit is available');
      window.open('moovit://nearby?lat='+usercoords.lat+'&lon='+usercoords.long+'&partner_id=visit-rio-app', '_system', 'location=no');
    }, function() {  // Error callback
    //console.log('Moovit is not available');

      if(ionic.Platform.isIOS()) {
        window.open('https://itunes.apple.com/us/app/moovit-local-transit-app/id498477945?c=menufortouristApp&pid=DL', '_system', 'location=no');
      }
      else if(ionic.Platform.isAndroid()) {
        window.open('https://play.google.com/store/apps/details?id=com.tranzmate&c=menufortouristApp&pid=DL', '_system', 'location=no');
      }
    });
  }

  this.openTargetMoovit = function(usercoords, post){

    console.log('opentarget');
    console.log(usercoords);

    var scheme = '';
    if(ionic.Platform.isIOS()) {
        console.log('isios');
        scheme = 'moovit://';
    }
    else if(ionic.Platform.isAndroid()) {
        console.log('isAndroid');
        scheme = 'com.tranzmate';
    }

    $cordovaAppAvailability.check(scheme) // URI Scheme
    .then(function() {  // Success callback
      //console.log('Moovit is available');
      window.open('moovit://directions?dest_lat='+post.coordinates.lat+'&dest_lon='+post.coordinates.long+'&dest_name='+post.title+'&orig_lat='+usercoords.lat+'&orig_lon='+usercoords.long+'&orig_name=MyPlace&partner_id=visit-rio-app', '_system', 'location=no');
    }, function() {  // Error callback
    //console.log('Moovit is not available');

      if(ionic.Platform.isIOS()) {
        window.open('https://itunes.apple.com/us/app/moovit-local-transit-app/id498477945?c=visit-rio-app&pid=DL', '_system', 'location=no');
      }
      else if(ionic.Platform.isAndroid()) {
        window.open('https://play.google.com/store/apps/details?id=com.tranzmate&c=visit-rio-app&pid=DL', '_system', 'location=no');
      }
    });
  }

}]);
