'use strict';


angular.module('insight.pools').controller('PoolsController', function($scope, $routeParams, StatisticsByDatePools, PoolChart) {

        var self = this;
        var date = new Date();
        var yyyy = date.getUTCFullYear().toString();
        var mm = (date.getUTCMonth() + 1).toString(); // getMonth() is zero-based
        var dd = date.getUTCDate().toString();
        var today = yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]);


        $scope.type = 'StackedBar';


		self.chartDate = $routeParams.date ? $routeParams.date : today;

		var poolChart = new PoolChart(self.chartDate);
        poolChart.load(StatisticsByDatePools, 'blocks_found', 'Pools');


        self.chartOptions = poolChart.chartOptions;


        self.init = function() {
        };
    });
