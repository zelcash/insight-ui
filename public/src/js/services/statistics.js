'use strict';

angular.module('insight.statistics')
	.factory('StatisticsByDaysTransactions', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/transactions', {
			days: '@days'
		});
	})
	.factory('StatisticsByDaysFees', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/fees', {
			days: '@days'
		});
	})
	.factory('StatisticsByDaysOutputs', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/outputs', {
			days: '@days'
		});
	})
	.factory('StatisticsByDaysDifficulty', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/difficulty', {
			days: '@days'
		});
	})
  .factory('StatisticsByDaysSupply', function($resource, $window) {

    return $resource($window.apiPrefix + '/statistics/supply', {
      days: '@days'
    });
  })
	.factory('Statistics24Hours', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/total');
	})
  .factory('StatisticsTotalSupply', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/total-supply?format=object', {
    });
  })
	.factory('StatisticsBalanceIntervals', function($resource, $window) {

			return $resource($window.apiPrefix + '/statistics/balance-intervals');
	})
	.factory('StatisticsRicherThan', function($resource, $window) {

			return $resource($window.apiPrefix + '/statistics/richer-than');
	})
	.factory('StatisticsRichestList', function($resource, $window) {

			return $resource($window.apiPrefix + '/statistics/richest-addresses-list');
	});
