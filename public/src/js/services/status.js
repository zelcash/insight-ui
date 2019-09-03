'use strict';

angular.module('insight.status')
  .factory('Status',
    function($resource) {
      return $resource(window.apiPrefix + '/status', {
        q: '@q'
      });
    })
  .factory('Sync',
    function($resource) {
      return $resource(window.apiPrefix + '/sync');
    })
  .factory('PeerSync',
    function($resource) {
      return $resource(window.apiPrefix + '/peer');
    })
  .factory('Peers',
    function($resource) {
      return $resource(window.apiPrefix + '/status?q=getPeerInfo');
   })
  .factory('ZelNodes',
   function($resource) {
     return $resource(window.apiPrefix + '/status?q=getZelNodes');
  })
  .factory('MiningInfo',
      function($resource) {
        return $resource(window.apiPrefix + '/status?q=getMiningInfo');
    });
