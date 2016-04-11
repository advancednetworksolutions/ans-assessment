'use strict';

describe('Controller: RegulatoryCtrl', function () {

  // load the controller's module
  beforeEach(module('rappApp'));

  var RegulatoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegulatoryCtrl = $controller('RegulatoryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
