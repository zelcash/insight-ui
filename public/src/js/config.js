'use strict';

angular.module('insight')
.constant('Constants', {

	CURRENCY: {
		BTCZ : 'BTCZ',
		USD : 'USD',
		BTC : 'BTC'
	},
	BLOCKS_AMOUNT: 15,
	TRANSACTION_DISPLAYED: 10,
	BLOCKS_DISPLAYED: 5,
	CHART_DAYS: 14,
    NETWORK: window.current_network ? window.current_network : 'livenet',
    DEFAULT_LANGUAGE: localStorage.getItem('insight-language') || 'en',
    DEFAULT_CURRENCY: localStorage.getItem('insight-currency') || 'BTCZ'

});
//Setting up route
angular.module('insight').config(function($routeProvider) {
  $routeProvider.
    when('/block/:blockHash', {
      templateUrl: 'views/block.html',
      title: 'BitcoinZ Block '
    }).
    when('/block-index/:blockHeight', {
      controller: 'BlocksController',
      templateUrl: 'views/redirect.html'
    }).
    when('/tx/send', {
      templateUrl: 'views/transaction_sendraw.html',
      title: 'Broadcast Raw Transaction'
    }).
    when('/tx/:txId/:v_type?/:v_index?', {
      templateUrl: 'views/transaction.html',
      title: 'BitcoinZ Transaction '
    }).
    when('/', {
      templateUrl: 'views/index.html',
      title: 'Home'
    }).
    when('/blocks', {
      templateUrl: 'views/block_list.html',
      title: 'BitcoinZ Blocks solved Today'
    }).
    when('/blocks-date/:blockDate/:startTimestamp?', {
      templateUrl: 'views/block_list.html',
      title: 'BitcoinZ Blocks solved '
    }).
    when('/address/:addrStr', {
      templateUrl: 'views/address.html',
      title: 'BitcoinZ Address '
    }).
	 when('/charts', {
      templateUrl: 'views/charts.html',
      title: 'Charts'
    }).
    when('/stats', {
		  templateUrl: 'views/statistics.html',
		  title: 'Stats'
	  }).
    when('/stats/:type/:days', {
		  controller: 'StatisticsController',
		  templateUrl: 'views/chart.html',
		  title: 'Statistics'
	 }).
	when('/pools', {
			controller: 'PoolsController',
			templateUrl: 'views/pools.html',
			title: 'Pools'
	}).
	when('/pools/:date', {
			controller: 'PoolsController',
			templateUrl: 'views/pools.html',
			title: 'Pools'
	}).
    when('/status', {
      templateUrl: 'views/status.html',
      title: 'Status'
    }).
		when('/network', {
			templateUrl: 'views/network.html',
			title: 'Network'
		}).
    when('/rich-list', {
        controller: 'RichListController',
        templateUrl: 'views/rich_list.html',
        title: 'Rich List'
	}).
	when('/messages/verify', {
      templateUrl: 'views/messages_verify.html',
      title: 'Verify Message'
    })
    .otherwise({
      templateUrl: 'views/404.html',
      title: 'Error'
    });
});

//Setting HTML5 Location Mode
angular.module('insight')
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  })
  .run(function($rootScope, $route, $location, $routeParams, $anchorScroll, ngProgress, gettextCatalog, amMoment) {
    gettextCatalog.currentLanguage = defaultLanguage;
    amMoment.changeLocale(defaultLanguage);
    $rootScope.$on('$routeChangeStart', function() {
      ngProgress.start();
    });

    $rootScope.$on('$routeChangeSuccess', function() {
      ngProgress.complete();

      //Change page title, based on Route information
      $rootScope.titleDetail = '';
      $rootScope.title = $route.current.title;
      $rootScope.isCollapsed = true;
      $rootScope.currentAddr = null;

      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  });
