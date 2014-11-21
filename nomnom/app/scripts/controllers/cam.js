'use strict';

/**
 * @ngdoc function
 * @name nomnomApp.controller:MainCtrl
 * @description
 * # CamCtrl
 * Controller of the nomnomApp
 */
angular.module('nomnomApp').controller('CamCtrl', function ($scope, apiService, $timeout) {	

	$scope.getRandom = function(){	
	  return Math.floor((Math.random()*100000)+1);
	};
	
	$scope.refresh = function(){
		$scope.imgSrc = apiService.apiBase() +  'cam/lastImage?rnd=' + $scope.getRandom();		
		$timeout($scope.refresh, 10000);
	};
	
	$scope.refresh();
});
