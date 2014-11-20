'use strict';

angular.module('nomnomV1App')
  .controller('DebugCtrl', function ($scope, apiService) {
    $scope.logContent = '';
	$scope.showLog = false;
	
	$scope.motorControl = {
		steps: 1	
	};
	
	
	$scope.showHideLog = function(){
		$scope.showLog = !$scope.showLog;
	
		if($scope.showLog === true){		
			apiService.getLog().then(function(data){	
				$scope.logContent = data.logContent;
			});		
		}	
	};
	
  });
