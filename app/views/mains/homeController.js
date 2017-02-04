(function () {
  'use strict';
  var controllerId = 'homeController';

  var module = angular.module('carlow.controllers');

  module.controller(controllerId,
      ['$rootScope', '$scope', '$window', '$timeout', 'Upload', 'api', homeController]);

  function homeController($rootScope, $scope, $window, $timeout, Upload, api) {
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

    $scope.uploadFile = function(file) {
        if(file) {
            Upload.upload({
                url: 'insert url',
                data: file
            }).then(function(response) {
                console.log('Success' + response);

                $scope.uploadedFile = true;

                $scope.fileId = response.data.fileId;
            }, function(error) {
                console.log('Error' + error)
            }, function(progress) {
                console.log(progress)
            })
        }
    }

    $scope.showHalf = function() {
        $scope.uploadedFile = true;
    }


    $scope.getData = function(type) {
        if (type === 'sources') {
            $('.section.one').toggleClass('full');
            api.getSources($scope.fileId).then(function(response) {
                $scope.sources = response.data;
            })
        } else if (type === 'topics') {
            $('.section.two').toggleClass('full');
            api.getTopics($scope.fileId).then(function(response) {
                $scope.topics = response.data;
            })
        } else if (type === 'sentiment') {
            $('.section.three').toggleClass('full');
            api.getSentimentAnalysis(fileId).then(function(response) {
                $scope.sentiments = response.data;
            })
        } else if (type === 'ner') {
            $('.section.four').toggleCLass('full');
            api.getNER(fileId).then(function(response) {
                $scope.ner = response.data;
            })
        }
    }
    
  }
})();