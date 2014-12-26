'use strict';

angular.module('nomnomV1App').controller('CamCtrl', function (apiService, $scope, $timeout) {

	$scope.getRandom = function(){	
	  return Math.floor((Math.random()*100000)+1);
	};
	
	$scope.refresh = function(){
		$scope.imgSrc = apiService.apiBase() +  'cam/latest?rnd=' + $scope.getRandom();		
		$timeout($scope.refresh, 2000);
	};
	
	$scope.refresh();

});
