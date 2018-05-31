'use strict';

angular.module('insight.charts')
  .factory('Chart',
    function($resource) {
    return $resource(window.apiPrefix + '/chart/:chartType', {
      chartType: '@chartType'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            return res.data;
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      }
    });
  })
  .factory('Charts',
    function($resource) {
      return $resource(window.apiPrefix + '/charts');
  });
