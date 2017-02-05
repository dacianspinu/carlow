(function () {
    'use strict';

    var module = angular.module('carlow.services');

    var hostname = 'weak-signals.herokuapp.com/spln';

    module.constant('config', {
        apiUrl: 'https://' + hostname
    });
})();
