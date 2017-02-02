angular.module('carlow.services', []);
angular.module('carlow.controllers', []);
angular.module('carlow.directives', []);

var carlow = angular.module('carlow', ["ngFileUpload", "ui.router", "carlow.services", "carlow.controllers", "carlow.directives"]);

carlow.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $provide) {
  console.log('carlow app angular');
});