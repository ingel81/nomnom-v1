'use strict';

angular.module('nomnomV1App')
	.controller('MainCtrl', function($scope, $http, apiService, modalService) {

		$scope.data = apiService.data;

		$scope.determineType = function() {

			console.log('determineType called');

			if (!$scope.data.stats) {
				return '';
			}

			if ($scope.data.stats.percFull < 0.3) {
				return 'danger';
			} else if ($scope.data.stats.percFull < 0.5) {
				return 'warning';
			} else {
				return 'success';
			}
		};

		$scope.feed = function() {
			apiService.emptyNextSlot();
		};

		$scope.fill = function() {
			modalService.showConfirmModal({
				title: 'Refill',
				description: 'Fill up all empty slots and confirm with OK.'
			}).then(function() {
				apiService.refillAll();
			});
		};

	});