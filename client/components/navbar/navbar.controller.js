'use strict';

angular.module('nomnomV1App')
  .controller('NavbarCtrl', function ($scope, $location, $route, $rootScope) {
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
	
	$rootScope.$on( '$routeChangeStart', function() {
		$scope.isCollapsed = true;
    });
	
  });