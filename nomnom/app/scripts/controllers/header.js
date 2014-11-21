'use strict';

/**
 * @ngdoc function
 * @name nomnomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nomnomApp
 */
angular.module('nomnomApp').controller('HeaderCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };	
});
