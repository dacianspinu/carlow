(function () {
  'use strict';
  var controllerId = 'homeController';

  var module = angular.module('carlow.controllers');

  module.controller(controllerId,
      ['$rootScope', '$scope', '$window', '$timeout', homeController]);

  function homeController($rootScope, $scope, $window, $timeout) {
    $(document).ready(function() {
        $timeout(function() {
            startInteractions();
        }, 200);
    })
    
    function startInteractions() {
        $scope.blurredBackground = true;

        $timeout(function() {
            $scope.visibleUploadSection = true;
        }, 300);
    }

    $scope.uploadFile = function() {
        $scope.uploadedFile = true;
    }
  }
})();
