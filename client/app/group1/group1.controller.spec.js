'use strict';

describe('Controller: Group1Ctrl', function () {

  // load the controller's module
  beforeEach(module('rappApp'));

  var Group1Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Group1Ctrl = $controller('Group1Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
