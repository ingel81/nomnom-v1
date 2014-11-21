'use strict';
//Zentrales Modul um Topics zu laden und zu behandeln
angular.module('nomnomApp').factory('apiService', ['$http', '$location', '$rootScope', '$q', function ($http, $location, $rootScope, $q) {

	//var apiBase = 'http://192.168.2.5:80/api/';
	var apiBase = '/api/';	
	var getlogUrl = apiBase + 'getlog';
	
	var loading = false;

	var getLog = function () {
		var task = $q.defer();
		loading = true;

		$http.get(getlogUrl).then(function (res) {
			loading = false;
			task.resolve(res.data || []);
		});

		return task.promise;
	};	
	
	//exposed
	return {
		loadingStatus: function () { return loading; },		
		getLog: getLog,
		apiBase : function(){ return apiBase;}
	};

}]);