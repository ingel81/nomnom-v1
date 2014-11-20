'use strict';

angular.module('nomnomV1App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cam', {
        templateUrl: 'app/cam/cam.html',
        controller: 'CamCtrl'
      });
  });
