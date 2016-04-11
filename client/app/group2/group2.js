'use strict';

angular.module('rappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/group2', {
        templateUrl: 'app/group2/group2.html',
        controller: 'Group2Ctrl',
        controllerAs: 'group2',
        authenticate: 'user'
      });
  });
