'use strict';

angular.module('rappApp.auth', [
  'rappApp.constants',
  'rappApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
