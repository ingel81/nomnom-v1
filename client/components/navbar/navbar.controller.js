'use strict';

angular.module('nomnomV1App')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
	{
      'title': 'Home',
      'link': '/'
    },
	{
      'title': 'Camera',
      'link': '/cam'
    },
	{
      'title': 'Debug',
      'link': '/debug'
    },
	
	];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });