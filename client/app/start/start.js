'use strict';

angular.module('rappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/start', {
        templateUrl: 'app/start/start.html',
        controller: 'StartCtrl',
        controllerAs: 'start'
      });
  });
