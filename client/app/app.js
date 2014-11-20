'use strict';

angular.module('nomnomV1App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    
	/*HTML5 Mode - Base Tag required*/
	$locationProvider.html5Mode(true);	
	
	/*Routes*/
	$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/cam', {
        templateUrl: 'views/cam.html',
        controller: 'CamCtrl'
      })
      .when('/debug', {
        templateUrl: 'views/debug.html',
        controller: 'DebugCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }).run(function ($rootScope) {
	$rootScope.app = {	
		loading: true
	};
});