'use strict';

/**
 * @ngdoc function
 * @name nomnomApp.controller:MainCtrl
 * @description
 * # CamCtrl
 * Controller of the nomnomApp
 */
angular.module('nomnomApp').controller('DebugCtrl', function ($scope, apiService) {

	$scope.logContent = "";

	var refresh = function(){
		apiService.getLog().then(function(data){	
			$scope.logContent = data.logContent;
		});	
	};
	
	refresh();	
});
