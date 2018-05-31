'use strict';

angular.module('insight.charts').controller('ChartsController',
  function($scope, $rootScope, $routeParams, $location, Chart, Charts) {
  $scope.loading = false;

  $scope.list = function() {
    Charts.get({
    }, function(res) {
      $scope.charts = res.charts;
    });

    if ($routeParams.chartType) {
      $scope.chart();
    }
  };

  $scope.chart = function() {
    $scope.loading = true;

    Chart.get({
      chartType: $routeParams.chartType
    }, function(chart) {
      $scope.loading = false;
      $scope.chartType = $routeParams.chartType;
      $scope.chartName = chart.name;
      $scope.chart = setTimeout(function(){
							return c3.generate(chart);
						},1);
    }, function(e) {
      if (e.status === 400) {
        $rootScope.flashMessage = 'Invalid chart: ' + $routeParams.chartType;
      }
      else if (e.status === 503) {
        $rootScope.flashMessage = 'Backend Error. ' + e.data;
      }
      else {
        $rootScope.flashMessage = 'Chart Not Found';
      }
      $location.path('/');
    });
  };

  $scope.params = $routeParams;

});