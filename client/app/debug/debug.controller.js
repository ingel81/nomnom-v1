'use strict';

angular.module('nomnomV1App')
  .controller('DebugCtrl', function ($scope, apiService) {
    $scope.logContent = '';
	$scope.showLog = false;
	
	$scope.motorControl = {
		steps: 1,
		direction: '',
		rpm: 1
	};
	
	$scope.doTheDrive = function(direction){		
		$scope.motorControl.direction = direction;
		apiService.motorDrive($scope.motorControl).then(function(){

		});		
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
