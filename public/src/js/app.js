'use strict';

var defaultLanguage = localStorage.getItem('insight-language') || 'en';
var defaultCurrency = localStorage.getItem('insight-currency') || 'RVN';

angular.module('insight',[
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'ngProgress',
  'ui.bootstrap',
  'ui.route',
  'monospaced.qrcode',
  'gettext',
  'angularMoment',
  'insight.system',
  'insight.socket',
  'insight.blocks',
  'insight.statistics',
  'insight.richList',
  'insight.transactions',
  'insight.address',
  'insight.search',
  'insight.charts',
  'insight.statistics',
  'insight.status',
  'insight.connection',
  'insight.currency',
  'insight.messages',
  'ngclipboard'
   
]);

angular.module('insight.system', []);
angular.module('insight.socket', []);
angular.module('insight.blocks', []);
angular.module('insight.transactions', []);
angular.module('insight.address', []);
angular.module('insight.search', []);
angular.module('insight.charts', []);
angular.module('insight.richList', []);
angular.module('insight.statistics', [ 'ngNumeraljs' ]);
angular.module('insight.status', []);
angular.module('insight.connection', []);
angular.module('insight.currency', []);
angular.module('insight.messages', []);
