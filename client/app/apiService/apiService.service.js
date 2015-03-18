'use strict';

angular.module('nomnomV1App').service('apiService', function($http, $location, $rootScope, $q) {
	// AngularJS will instantiate a singleton by calling "new" on this function

	var apiBase = '/api/';
	var getlogUrl = apiBase + 'log';
	var postMotorDriveUrl = apiBase + 'motor/drive';
	var refillAllUrl = apiBase + 'slots/refillall';
	var emptyNextSlotUrl = apiBase + 'slots/emptynextslot';
	var slotStatusUrl = apiBase + 'slots';

	var loading = false;

	var data = {
		slots: null,
		stats: null
	};

	var getLog = function() {
		var task = $q.defer();
		loading = true;

		$http.get(getlogUrl).then(function(res) {
			loading = false;
			task.resolve(res.data || []);
		});

		return task.promise;
	};

	var motorDrive = function(driveData) {
		var task = $q.defer();
		loading = true;

		$http.post(postMotorDriveUrl, driveData).then(function(res) {
			loading = false;
			task.resolve(res.data || []);
		});

		return task.promise;
	};

	var refillAll = function() {
		var task = $q.defer();
		loading = true;

		$http.post(refillAllUrl).then(function(res) {

			refreshSlotStatus();

			loading = false;
			task.resolve(res.data || []);
		});

		return task.promise;
	};

	var emptyNextSlot = function() {
		var task = $q.defer();
		loading = true;

		$http.post(emptyNextSlotUrl).then(function(res) {

			refreshSlotStatus();

			loading = false;
			task.resolve(res.data || []);
		});

		return task.promise;
	};

	var refreshSlotStatus = function() {
		var task = $q.defer();
		loading = true;

		$http.get(slotStatusUrl).then(function(res) {
			loading = false;
			data.slots = res.data || [];

			calcStats();

			task.resolve(res.data || []);
		});

		return task.promise;
	};

	var calcStats = function() {

		data.stats = {
			slotCount: data.slots.length,
			slotEmptyCount: 0,
			slotFullCount: 0,
			percFull: 0
		};

		//how many slots do we have
		for (var i = 0; i < data.slots.length; i++) {

			var s = data.slots[i];

			if (s.status !== 'full') {
				data.stats.slotEmptyCount++;
			}

			if (s.status === 'full') {
				data.stats.slotFullCount++;
			}
		}

		data.stats.percFull = data.stats.slotFullCount / data.stats.slotCount;
	};


	var init = function() {
		refreshSlotStatus();
	};


	init();

	//exposed
	return {
		loadingStatus: function() {
			return loading;
		},
		getLog: getLog,
		motorDrive: motorDrive,
		refillAll: refillAll,
		emptyNextSlot: emptyNextSlot,
		data: data,
		apiBase: function() {
			return apiBase;
		}
	};
});