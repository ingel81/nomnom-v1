'use strict';

angular.module('nomnomV1App')
	.service('modalService', function($modal, $q) {
		// AngularJS will instantiate a singleton by calling "new" on this function

		var isModalOpen = false;

		var _createModal = function(templateUrl, controller, size, parameters) {

			var task = $q.defer();

			isModalOpen = true;

			var modalInstance = $modal.open({
				templateUrl: templateUrl,
				controller: controller,
				size: size || 'lg',
				backdrop: 'static',
				resolve: {
					parameters: function() {
						return parameters;
					}
				}
			});

			modalInstance.result.then(function(modalResult) {				
				isModalOpen = false;
				task.resolve(modalResult);
			}, function() {				
				isModalOpen = false;
				task.reject();
			});

			return task.promise;
		};

		return {
			showConfirmModal: function(parameters) {
				return _createModal('app/modalService/confirmModal/confirmModal.html', 'ConfirmModalCtrl', 'lg', parameters);
			}

		};

	});