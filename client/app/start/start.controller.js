'use strict';

(function() {
class StartController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor($scope,$http,$routeParams,$cookies,$location) {
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.$cookies = $cookies;
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.client = '';
    this.msgs = {};
    this.ra = {};
    this.$http.defaults.headers.common['X-Assessment-Token'] = this.$cookies.get('ansaccess');
    if(!this.$routeParams.id){
      this.$location.path('/signup');
    }else{
      if(!this.$cookies.get('ansaccess')){
        this.$location.path('/signup');
      }else{
        this.$http.get('api/assessments/'+this.$routeParams.id)
          .then(response => {
            //console.log(response.data);
            this.ra = response;
            console.log(this.ra.data.Account__c);
          });
      }
    }


  }

  start(){
    this.$location.path('/group1');
  }

}

angular.module('rappApp')
  .controller('StartCtrl', StartController);
})();
