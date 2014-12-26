'use strict';

angular.module('nomnomV1App').service('apiService', function ($http, $location, $rootScope, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	var apiBase = '/api/';	
	var getlogUrl = apiBase + 'log';
	var postMotorDriveUrl = apiBase + 'motor/drive';
	
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
	
	var motorDrive = function (driveData) {
		var task = $q.defer();
		loading = true;

		$http.post(postMotorDriveUrl, driveData).then(function (res) {
			loading = false;
			task.resolve(res.data || []);
		});

		return task.promise;
	};	
	
	//exposed
	return {
		loadingStatus: function () { return loading; },		
		getLog: getLog,
		motorDrive : motorDrive,
		apiBase : function(){ return apiBase;}
	};
});
