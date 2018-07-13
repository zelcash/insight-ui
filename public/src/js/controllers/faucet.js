'use strict';

angular.module('insight.faucet').controller('FaucetController',
  function($scope, $http, $timeout) {
  $scope.stopSpam = false;
  $scope.message = {
    address: '',

  };
  function activateBtn(){
    $scope.stopSpam = false;
  };
  $scope.verification = {
    status: 'unverified',  // ready|loading|verified|error
    result: null,
    error: null,
    address: ''
  };

  $scope.verifiable = function() {
    return ($scope.stopSpam
	);
  };
  $scope.verify = function() {
	$scope.stopSpam = true;
	$timeout(activateBtn, 5000);
    $scope.verification.status = 'loading';
    $scope.verification.address = $scope.message.address;
    $http.get('faucet/withdrawal?address=' + $scope.message.address)
      .success(function(data) {

        $scope.verification.status = 'verified';
        $scope.verification.result = data.data.txId;
      })
      .error(function(data) {
        $scope.verification.status = 'error';
        $scope.verification.error = data.data.message;
      });
  };

  // Hide the verify status message on form change
  var unverify = function() {
    $scope.verification.status = 'unverified';
  };
  $scope.$watch('message.address', unverify);
});