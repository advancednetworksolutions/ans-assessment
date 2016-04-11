'use strict';

angular.module('rappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/regulatory', {
        templateUrl: 'app/regulatory/regulatory.html',
        controller: 'RegulatoryCtrl',
        controllerAs:'regulatory',
        authenticate:'user'
      });
  });
