'use strict';

/**
 * @ngdoc function
 * @name nomnomApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the nomnomApp
 */
angular.module('nomnomApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
