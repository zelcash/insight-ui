'use strict';

angular.module('insight.statistics').controller('StatisticsController',
function($scope, $routeParams, StatisticsByDaysTransactions, StatisticsByDaysOutputs, StatisticsByDaysNetHash, StatisticsByDaysFees, StatisticsByDaysDifficulty, PoolDayChart, Statistics24Hours, Statistics1Hour, gettextCatalog, $filter, Constants, StatisticChart, MarketsInfo, MiningInfo, StatisticsTotalSupply) {

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
			},
			'nethash' : {
				factory : StatisticsByDaysNetHash,
				field : 'sum'
			}
		};

		self.chartText = {
			fees: gettextCatalog.getString('The daily average of fees paid to miners per transaction.'),
			transactions: gettextCatalog.getString('The number of daily confirmed SAFE transactions.'),
			outputs: gettextCatalog.getString('The total value of all transaction outputs per day (includes coins returned to the sender as change).'),
			difficulty: gettextCatalog.getString('A relative measure of how difficult it is to find a new block. The difficulty is adjusted periodically as a function of how much hashing power has been deployed by the network of miners.'),
			nethash: gettextCatalog.getString('The daily average Global Network Hashrate.')
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
	$scope.type = 'StackedBar';
	self.getDifficulties = function(){
        statisticChart.load(factories[ $routeParams.type ].factory, factories[ $routeParams.type ].field, $routeParams.type);
	};

	self.get24HoursStats = function() {

		Statistics24Hours.get(function(response) {

			self.statsTotal24 = response;
		});

		var pools1hChart = new PoolDayChart();
		self.pools1hOptions = pools1hChart.chartOptions;
		pools1hChart.load(Statistics1Hour, 'blocks_found', 'Pools');

		var pools24hChart = new PoolDayChart();
		self.pools24hOptions = pools24hChart.chartOptions;
		pools24hChart.load(Statistics24Hours, 'blocks_found', 'Pools');

		    MarketsInfo.get({}, function(response) {
            if (response) {
				self.marketPrice = response.price;
				self.marketBtcPrice = response.price_btc;
				self.marketCap = response.price * 32433500;
				self.volume = response.total_volume_24h;
				self.percent = response.delta_24h;
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
