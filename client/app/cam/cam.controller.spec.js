'use strict';

describe('Controller: CamCtrl', function () {

  // load the controller's module
  beforeEach(module('nomnomV1App'));

  var CamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CamCtrl = $controller('CamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
