(function () {
  'use strict';
  var controllerId = 'appController';

  var module = angular.module('carlow.controllers');

  module.controller(controllerId,
      ['$rootScope', '$scope', '$window', '$timeout', appController]);

  function appController($rootScope, $scope, $window, $timeout) {
    console.log('appController');
  }
})();
