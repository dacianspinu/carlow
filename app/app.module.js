angular.module('carlow.services', []);
angular.module('carlow.controllers', []);
angular.module('carlow.directives', []);

var carlow = angular.module('carlow', ["ngFileUpload", "ui.router", "carlow.services", "carlow.controllers", "carlow.directives"]);

carlow.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $provide, $locationProvider) {
  $urlRouterProvider.when('', '/home');

  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: './app/views/mains/home.html'
  };

  $stateProvider
    .state(homeState);
});