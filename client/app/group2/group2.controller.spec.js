'use strict';

describe('Controller: Group2Ctrl', function () {

  // load the controller's module
  beforeEach(module('rappApp'));

  var Group2Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Group2Ctrl = $controller('Group2Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
