(function () {
    'use strict';

    var module = angular.module('carlow.services');
    var hostname = window.location.hostname;

    //if hostname is localhost this must be reasigned to the url of the api

    // if (hostname === 'localhost') {
        // hostname = http://api.url.com
    // }

    module.constant('config', {
        apiUrl: 'http://' + hostname + '/api/',
        originUrl: 'http://' + hostname
    });
})();
