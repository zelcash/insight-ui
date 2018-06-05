'use strict';

angular.module('insight.statistics').controller('StatisticsController',
function($scope, $routeParams, Statistics, StatisticsByDaysTransactions, StatisticsByDaysOutputs, StatisticsByDaysFees, StatisticsByDaysDifficulty, Statistics24Hours, gettextCatalog, $filter, Constants, StatisticChart, MarketsInfo, MiningInfo, StatisticsTotalSupply) {

	var self = this,
		factories = {
			'transactions' : {
				factory : StatisticsByDaysTransactions,
				field : 'transaction_count'
			},
			'outputs' : {
				factory : StatisticsByDaysOutputs,
				field : 'sum'
			},
			'fees' : {
				factory : StatisticsByDaysFees,
				field : 'fee'
			},
			'difficulty' : {
				factory : StatisticsByDaysDifficulty,
				field : 'sum'
			}
		};

		self.chartText = {
			fees: gettextCatalog.getString('The daily average of fees paid to miners per transaction.'),
			transactions: gettextCatalog.getString('The number of daily confirmed RVN transactions.'),
			outputs: gettextCatalog.getString('The total value of all transaction outputs per day (includes coins returned to the sender as change).'),
			difficulty: gettextCatalog.getString('A relative measure of how difficult it is to find a new block. The difficulty is adjusted periodically as a function of how much hashing power has been deployed by the network of miners.')

		};

		self.chartDays = $routeParams.days;
		self.chartType = $routeParams.type;
		self.marketCurrency = Constants.CURRENCY.USD;
		self.marketPrice = 0;
		self.marketBtcPrice = 0;
		self.marketCap = 0;
		self.volume = 0;
		self.percent = 0;
		self.difficulty = 0;
		self.networkhashps = 0;
		self.totalsupply = 0;
		
		
		var statisticChart = new StatisticChart(self.chartDays);
		self.chartOptions = statisticChart.chartOptions;

		self.daysButtons = statisticChart.daysButtons;


	$scope.$on('chart-create', function (evt, chart) {

		if (chart.chart.canvas.id === 'line') {

            statisticChart.changeChartColor(chart);
			chart.update();
		}
	});

	self.getDifficulties = function(){
        statisticChart.load(factories[ $routeParams.type ].factory, factories[ $routeParams.type ].field, $routeParams.type);
	};

	self.get24HoursStats = function() {

		Statistics24Hours.get(function(response) {

			self.statsTotal24 = response;
		});

        MarketsInfo.get({}, function(response) {
            if (response) {
				self.marketPrice = response.price_usd;
				self.marketBtcPrice = response.price_btc;
				self.marketCap = response.market_cap_usd;
				self.volume = response["24h_volume_usd"];
				self.percent = response.percent_change_24h;
            }
        });
		MiningInfo.get({}, function(response) {
			if (response) {
				self.difficulty = response.miningInfo.difficulty;
				self.networkhashps = response.miningInfo.networkhashps;
            }
        });
		StatisticsTotalSupply.get({}, function(response) {
			if (response) {
				self.totalsupply = response.supply;
            }
        });
	};
});
