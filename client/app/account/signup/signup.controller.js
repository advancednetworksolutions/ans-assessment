'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $location,$routeParams,$cookies) {
    this.$routeParams = $routeParams;
    this.Auth = Auth;
    this.$location = $location;
    this.$cookies = $cookies;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      if(this.$routeParams.id){
        this.Auth.createUser({
          name:this.user.name,
          raId:this.$routeParams.id,
          password:this.user.access
        })
        .then(() => {
          this.$cookies.put('ansaccess',this.user.access);
          // Account created, redirect to home
          this.$location.path('/start');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
      }else{
        alert('Please navigate to the unique url provided by your ANS Sales Representative');
      }

    }
  }
}

angular.module('rappApp')
  .controller('SignupController', SignupController);
