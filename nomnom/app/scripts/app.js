'use strict';

/**
 * @ngdoc overview
 * @name nomnomApp
 * @description
 * # nomnomApp
 *
 * Main module of the application.
 */
angular
  .module('nomnomApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
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
		loading: true,
		navCollapsed: true	
	};
});
