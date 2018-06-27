'use strict';


angular.module('insight.pools').controller('PoolsController', function($scope, $rootScope, $routeParams, $location, Global, StatisticsByDatePools, StatisticsByDaysNetHash, PoolChart) {

	$scope.global = Global;
	$scope.loading = false;

	var _formatTimestamp = function (date) {
    var yyyy = date.getUTCFullYear().toString();
    var mm = (date.getUTCMonth() + 1).toString(); // getMonth() is zero-based
    var dd  = date.getUTCDate().toString();

    return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]); //padding
	};

  $scope.$watch('dt', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $location.path('/pools/' + _formatTimestamp(newValue));
    }
  });

  $scope.openCalendar = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.humanSince = function(time) {
    var m = moment.unix(time).startOf('day');
    var b = moment().startOf('day');
    return m.max().from(b);
  };
        var self = this;
        var date = new Date();
        var yyyy = date.getUTCFullYear().toString();
        var mm = (date.getUTCMonth() + 1).toString(); // getMonth() is zero-based
        var dd = date.getUTCDate().toString();
        var today = yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]);


        $scope.type = 'StackedBar';
		$scope.$on('chart-create', function (evt, chart) {
					$scope.legend = chart.chart.legend.legendItems;
					if ( $scope.legend && $scope.legend.length > 0) {
					$scope.$emit('charted');
					}
        });

		function performTask() {
		if ($scope.legend && $scope.pools1) {
		for (var i = 0; i < $scope.legend.length; i++) {
					$scope.pools1[i].fill = $scope.legend[i].fillStyle;
					}

					$scope.pools = $scope.pools1;
		}
		}
		var events = { a: false, b: false };

		function checkIfPerfomTask() {
			for (var key in events) {
				if (!events[key]) { return; }
			}
			performTask();
		}

		$scope.$on("charted", function(){ events.a = true; checkIfPerfomTask(); });
		$scope.$on("api", function(){ events.b = true; checkIfPerfomTask(); });

		self.chartDate = $routeParams.date ? $routeParams.date : today;

		var poolChart = new PoolChart(self.chartDate);
        poolChart.load(StatisticsByDatePools, 'blocks_found', 'Pools');


        self.chartOptions = poolChart.chartOptions;


        self.init = function() {
			    $scope.loading = true;


				if ($routeParams.date) {
				$scope.detail = 'On ' + $routeParams.date;
				}
				$rootScope.titleDetail = $scope.detail;

				StatisticsByDatePools.get({
					date: $routeParams.date
				}, function(res) {
					$scope.loading = false;
					$scope.pools1 = res.blocks_by_pool;
					$scope.pagination = res.pagination;
					$scope.blocks = res.n_blocks_mined;
					if ( $scope.pools1 && $scope.pools1.length > 0) {
					$scope.$emit('api');
					}


				});
				StatisticsByDaysNetHash.query({
					days : 'all'
				},
				function(res) {

					for (var i = 0; i < res.length; i++) {
						if (res[i].date === self.chartDate.toString()) {
							$scope.nethash = res[i].sum;
						}
					};
				});

        };
    });
