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
                url: 'https://weak-signals.herokuapp.com/spln/upload/' + file.name + '/',
                // url: 'http://localhost:8000/spln/upload/' + file.name + '/',
                file: file
            }).then(function(response) {
                $scope.uploadedFile = true;

                console.log(response);

                $scope.fileId = response.data.fileId;
            }, function(error) {

            }, function(progress) {
                // console.log(JSON.stringify(progress))
            })
        }
    }

    $scope.showHalf = function() {
        $scope.uploadedFile = true;
    }


    $scope.getData = function(type) {
        if (type === 'sources') {
            api.getSources($scope.fileId).then(function(response) {
                $('.section.one').toggleClass('full');
                $scope.sources = response.data.data;
                console.log($scope.sources)
            })
        } else if (type === 'topics') {
            api.getTopics($scope.fileId).then(function(response) {
                $('.section.two').toggleClass('full');
                $scope.topics = response.data.data;
                console.log($scope.topics)
            })
        } else if (type === 'sentiment') {
            api.getSentimentAnalysis($scope.fileId).then(function(response) {
                $('.section.three').toggleClass('full');
                $scope.sentiments = response.data;
                console.log($scope.sentiments)
            })
        } else if (type === 'ner') {
            api.getNER($scope.fileId).then(function(response) {
                $('.section.four').toggleClass('full');
                $scope.ner = JSON.parse(response.data.data)["NER"];

                console.log($scope.ner)
            })
        }
    }
    
  }
})();