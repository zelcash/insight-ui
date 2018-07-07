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
	.factory('StatisticsByDaysNetHash', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/network-hash', {
			days: '@days'
		});
	})
	.factory('StatisticsByDatePools', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/pools');
	})
	.factory('Statistics24Hours', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/total');
	})
	.factory('Statistics1Hour', function($resource, $window) {

		return $resource($window.apiPrefix + '/statistics/pools-last-hour');
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
	})
	.factory('PoolDayChart', function(gettextCatalog, $filter) {

        function PoolDayChart() {


            this.chartOptions = {
                series : ['Test'],
                data: [],
								labels: ['Test1'],
								datasetOverride : [],

                options : {
                    plugins: {
                      stacked100: { enable: true, replaceTooltipLabel: true }
                    },
								tooltips:{
												mode: 'dataset',
												intersect: true,
                        backgroundColor: '#012d88',
                        titleFontFamily: 'Ubuntu,sans-serif',
                        titleFontSize: 12,
                        titleFontStyle: '500',
                        titleFontColor: '#ffffff',
                        bodyFontFamily: 'Ubuntu,sans-serif',
                        bodyFontSize: 12,
                        bodyFontStyle: '400',
                        bodyFontColor: '#ffffff',
                        caretSize: 5,
                        cornerRadius: 3,
                        displayColors: false,
                        callbacks: { }
                    },
                layout: {
                        padding: {
                            left: 5
                        }
                    },
								legend: {
												display: true,
												position: 'bottom',
												labels: {
							    				fontColor: '#4700cc',
                          fontFamily: 'Ubuntu,sans-serif'
												}
									 },
								hover: {
									mode: 'single'
								},
					scales: {
							xAxes: [{
								display: false,
								stacked: true,
								gridLines: {
									display:false,
									drawBorder: false
								}
							}],
							yAxes: [{
								display: false,
								stacked: true,
								gridLines: {
									display:false,
									drawBorder: false
								}
							}]
						}
                }
            };

            //this.chartStats = [];

        }

        PoolDayChart.prototype.load = function (factory, itemField, itemName) {
            var self = this;

            factory.get({}, function(response){

				var array = response.blocks_by_pool

				self.chartOptions.labels = [  ];

				self.chartOptions.blocks = response.n_blocks_mined
				
                self.chartOptions.data = array.map(function(item) {

				return [item[ itemField ]];

                });
				self.chartOptions.datasetOverride = array.map(function(item) {
				var pallette;
				function getRandomColor() {
					var letters = '0123456789ABCDEF'.split('');
					var color = '#';
					for (var i = 0; i < 6; i++ ) {
						color += letters[Math.floor(Math.random() * 16)];
					}
					return color;
				}
				pallete = getRandomColor();
				return {
						label: item.poolName,
						data: [ item[ itemField ] ],
						hoverBorderColor: "#012d88",
						hoverBackgroundColor: pallete,
						backgroundColor: pallete + 'bd',
						borderColor: pallete,
						borderWidth: 2


					};
                });
                self.chartOptions.series = [ itemName ];
                //self.chartStats = response.blocks_by_pool;

            });

        };

        return PoolDayChart;

});
