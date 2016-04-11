'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $location,$routeParams) {
    this.Auth = Auth;
    this.$location = $location;
    this.$routeParams = $routeParams;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        access: this.user.access,
        raId: this.$routeParams.id
      })
      .then(() => {
        // Logged in, redirect to home
        this.$location.path('/');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('rappApp')
  .controller('LoginController', LoginController);
