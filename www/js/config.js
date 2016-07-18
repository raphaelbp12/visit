angular.module('starter.config', [
  'ionic',
  'restangular'
])
.config(function(RestangularProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('top');

  RestangularProvider.setBaseUrl('https://visit-rio-api.herokuapp.com/');
  //RestangularProvider.setBaseUrl('http://localhost:3000/');
  RestangularProvider.setDefaultHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });
  RestangularProvider.setDefaultHttpFields({
      'withCredentials': true
  });

  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
      window.open = cordova.InAppBrowser.open;
  }
});
