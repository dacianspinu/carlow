(function () {
    'use strict';

    var serviceId = 'api';

    var module = angular.module('dpla.services');

    module.factory(serviceId, ['$http', 'config', '$q', '$httpParamSerializerJQLike', api]);

    function api($http, config, $q, $httpParamSerializerJQLike) {
        var baseUrl = config.apiUrl;
        var originUrl = config.originUrl;
        var service = {
          merchants: {
            getAll: function(skip, records) {
              var url = baseUrl + 'merchants?skip=' + skip + '&records=' + records;

              return getWithHeaders(url);
            },
            getOne: function(id) {
              var url = baseUrl + 'merchants/' + id;

              return getWithHeaders(url);
            },
            create: function(merchantObject) {
              var url = baseUrl + 'merchants';

              return postWithHeaders(url, merchantObject);
            },
            edit: function(id, merchantObject) {
              var url = baseUrl + 'merchants/' + id;

              return patchWithHeaders(url, merchantObject);
            },
            delete: function(id) {
              var url = baseUrl + 'merchants/' + id;

              return deleteWithHeaders(url);
            },
            getMerchantLogo: function(id) {
              var url = baseUrl + 'merchants/' + id + '/logo'

              var apiConfig = {
                headers : getHeaders(false, true)
              }

              return $http.get(url, apiConfig);
            }
          },
          invoices: {
            getAll: function(skip, records, merchantSettingsId, department) {
              var url = baseUrl + 'invoices?skip=' + skip + '&records=' + records + '&merchantSettingsId=' + merchantSettingsId + '&department=' + department;

              return getWithHeaders(url);
            },
            getOne: function(id) {
              var url = baseUrl + 'invoices/' + id;

              return getWithHeaders(url);
            }
          },
          files: {
            getAll: function(skip, records, uploadDate, status) {
              var url = baseUrl + 'files?skip=' + skip + '&records=' + records + '&uploadDate=' + uploadDate + '&status=' + status;

              return getWithHeaders(url);
            },
            download: function(id) {
              var url = baseUrl + 'files/' + id + '/download';

              return getWithHeaders(url);
            }
          },
          settings: {
            alerts: {
              getAllSubscribers: function() {
                var url = baseUrl + 'subscribers';

                return getWithHeaders(url);
              },
              addSubscriber: function(subscriberEmail) {
                var object = {
                  email: subscriberEmail
                }
                var url = baseUrl + 'subscriber';

                return postWithHeaders(url, object);
              },
              editSubscriber: function(subscriber) {
                var object = {
                  email: subscriber.email
                }

                var url = baseUrl + 'subscribers/' + subscriber.id;

                return patchWithHeaders(url, object);
              },
              deleteSubscriber: function(subscriberId) {
                var url = baseUrl + 'subscribers/' + subscriberId;

                return deleteWithHeaders(url);
              }
            }
          },
          payment: {
            getAvailableIssuers: function(uniqueInvoiceId) {
              var url = baseUrl + 'pay/issuers?invoiceId=' + uniqueInvoiceId;

              return getWithHeaders(url);
            },
            getOneInvoice: function(uniqueInvoiceId) {
              var url = baseUrl + 'pay/landing?invoiceId=' + uniqueInvoiceId;

              return getWithHeaders(url);
            },
            computeTransactionLink: function(uniqueInvoiceId, issuerId) {
              var object = {
                invoiceId: uniqueInvoiceId,
                issuerId: issuerId
              };

              var url = baseUrl + 'pay/transaction';

              return postWithHeaders(url, object);
            },
            getTransactionStatus: function(transactionId) {
              var url = baseUrl + 'pay/confirm?trxid=' + transactionId;

              return getWithHeaders(url);
            }
          }
        }

        function getHeaders(json, enableBlob) {
            var headers = {};
            var token = localStorage.tokenKey;

            if (json) {
                headers['Content-Type'] = 'application/json';
            }
            if (token) {
                headers.Authorization = 'Bearer ' + token;
            }
            if (enableBlob) {
              headers['responseType'] = "blob";
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
