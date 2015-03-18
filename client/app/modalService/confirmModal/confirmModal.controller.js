'use strict';

angular.module('nomnomV1App')
	.controller('ConfirmModalCtrl', function($scope, $modalInstance, parameters) {

		$scope.params = parameters;

		$scope.ok = function() {
			$modalInstance.close(true);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss(false);
		};

	});