'use strict';

angular.module('rappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/company', {
        templateUrl: 'app/company/company.html',
        controller: 'CompanyCtrl',
        controllerAs: 'company',
        authenticate: 'user'
      });
  });
