'use strict';

angular.module('nomnomV1App')
  .controller('DebugCtrl', function ($scope, apiService, $interval) {
    $scope.logContent = '';
	$scope.showLog = false;
	
	$scope.visuals = {
		currentSlitDegree : 0,
		targetSlitDegree : 0,
		degreePerSeconds : 0,
		direction : ''
	};
	
	$scope.motorControl = {
		steps: 1,
		direction: '',
		rpm: 1
	};
	
	$scope.animator = null;
	
	$scope.doTheDrive = function(direction){
	
		var change = (360 / 200) * $scope.motorControl.steps;		

		$scope.visuals.degreePerSeconds =  (360) / (60 ) * $scope.motorControl.rpm;		
		$scope.visuals.direction = direction;
		
		if(direction === 'cw'){
			$scope.visuals.targetSlitDegree += change;
		}else{		
			$scope.visuals.targetSlitDegree -= change;
		}		
	
		$scope.motorControl.direction = direction;
		
		apiService.motorDrive($scope.motorControl).then(function(){
			$scope.visuals.currentSlitDegree = $scope.visuals.targetSlitDegree;
		});		
	};	
	
	$scope.refillAll = function(){
		apiService.refillAll().then(function(){			
		});		
	};
	
	$scope.emptyNextSlot = function(){
		apiService.emptyNextSlot().then(function(){			
		});		
	};	
	
	var updateGui = function(){
		if($scope.visuals.currentSlitDegree !== $scope.visuals.targetSlitDegree){			
			if($scope.visuals.direction === 'cw'){
				$scope.visuals.currentSlitDegree += $scope.visuals.degreePerSeconds / 5;
			}else{
				$scope.visuals.currentSlitDegree -= $scope.visuals.degreePerSeconds / 5;			
			}			
		}
	};
	
	$scope.showHideLog = function(){
		$scope.showLog = !$scope.showLog;
	
		if($scope.showLog === true){		
			apiService.getLog().then(function(data){	
				$scope.logContent = data.logContent;
			});		
		}	
	};
	
	$scope.animator = $interval(updateGui, 200);	
  });
