(function () {
    'use strict';

    var serviceId = 'api';

    var module = angular.module('dpla.services');

    module.factory(serviceId, ['$http', 'config', '$q', '$httpParamSerializerJQLike', api]);

    function api($http, config, $q, $httpParamSerializerJQLike) {
        var baseUrl = config.apiUrl;
        var originUrl = config.originUrl;
        var service = {
        }

        function getHeaders(json, enableBlob) {
            var headers = {};

            if (json) {
                headers['Content-Type'] = 'application/json';
            }

            return headers;
        }

        function getWithHeaders(url) {
            var apiConfig = {
                headers: getHeaders(true)
            };
            return $http.get(url, apiConfig);
        }

        function postWithHeaders(url, data, disableAuth) {
            var apiConfig = {
                headers: getHeaders(true, disableAuth)
            };
            return $http.post(url, data, apiConfig);
        }

        function putWithHeaders(url, data, disableAuth) {
            var apiConfig = {
                headers: getHeaders(true)
            };

            return $http.put(url, data, apiConfig);
        }

        function patchWithHeaders(url, data, disableAuth) {
            var apiConfig = {
                headers: getHeaders(true, disableAuth)
            };

            return $http.patch(url, data, apiConfig);
        }

        function deleteWithHeaders(url) {
            var apiConfig = {
                headers: getHeaders(true)
            };
            return $http.delete(url, apiConfig);
        }

        return service;
    }
})();
