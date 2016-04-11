'use strict';

angular.module('rappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/group1', {
        templateUrl: 'app/group1/group1.html',
        controller: 'Group1Ctrl',
        controllerAs: 'group1',
        authenticate: 'user'
      });
  });
