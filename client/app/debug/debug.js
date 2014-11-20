'use strict';

angular.module('nomnomV1App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/debug', {
        templateUrl: 'app/debug/debug.html',
        controller: 'DebugCtrl'
      });
  });
