'use strict';

(function() {
  class RegulatoryController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    //end-non-standard

    constructor($scope, $http, $routeParams, $cookies, $location) {
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.$cookies = $cookies;
      this.$http = $http;
      this.$scope = $scope;
      this.$scope.client = '';
      this.$scope.msgs = {};
      this.$scope.ra = {};
      this.progress = 5;
      this.$scope.savedChanges = true;
      this.changesMade = false;
      this.$scope.section_title = 'Regulatory Needs and Additional Items';
      this.$http.defaults.headers.common['X-Assessment-Token'] = this.$cookies.get('ansaccess');
      if (!this.$routeParams.id) {
        this.$location.path('/signup');
      } else {
        if (!this.$cookies.get('ansaccess')) {
          this.$location.path('/signup');
        } else {
          this.$http.get('api/assessments/' + this.$routeParams.id)
            .then(response => {

              this.$scope.ra = response;
              this.ra = this.$scope.ra;
              var vm = this;
              this.$scope.$watch('ra.data', function(newVal, oldVal) {
                console.log(oldVal);
                console.log(newVal);
                if (newVal != oldVal) {
                  vm.$scope.savedChanges = false;
                  vm.changesMade = true;
                  console.log(vm.$scope.savedChanges);
                  console.log(vm.$scope.changesMade);
                }
              }, true);

              this.$scope.$watch('ra.data.Regulatory_or_Compliance_Requirements__c', function(newVal, oldVal) {
                console.log(oldVal);
                console.log(newVal);
                if (newVal == "true") {
                  vm.ra.data.Regulatory_or_Compliance_Requirements__c = true;
                } else if (newVal == "false") {
                  vm.ra.data.Regulatory_or_Compliance_Requirements__c = false;
                }
              });

              this.$scope.$on('$routeChangeStart', function(event, next, current) {
                if (!vm.$scope.savedChanges) {
                  var r = confirm('You have unsaved changes! Would you still like to leave this page?');
                  if (r == false) {
                    event.preventDefault();
                  }
                }
              });
            });
        }
      }
    }

    save() {
      this.$scope.savedChanges = true;
      this.$scope.changesMade = false;
      //if((parseFloat(this.$scope.ra.data.Desktops__c) + parseFloat(this.$scope.ra.data.Laptops__c)) != parseInt(this.$scope.ra.data.Workstations__c)){
      if (this.$scope.ra.data.Hardware_Under_Warranty__c == "true") {
        var body = {
          Id: this.$scope.ra.data.Id,
          Changes_Last_12_Months__c: this.$scope.ra.data.Changes_Last_12_Months__c,
          Upcoming_Changes__c: this.$scope.ra.data.Upcoming_Changes__c,
          Hardware_Replacement_Frequency__c: this.$scope.ra.data.Hardware_Replacement_Frequency__c,
          Hardware_Under_Warranty__c: this.$scope.ra.data.Hardware_Under_Warranty__c
        }
      } else {
        var body = {
          Id: this.$scope.ra.data.Id,
          Changes_Last_12_Months__c: this.$scope.ra.data.Changes_Last_12_Months__c,
          Upcoming_Changes__c: this.$scope.ra.data.Upcoming_Changes__c,
          Hardware_Replacement_Frequency__c: this.$scope.ra.data.Hardware_Replacement_Frequency__c,
          Hardware_Under_Warranty__c: this.$scope.ra.data.Hardware_Under_Warranty__c
        }
      }

      this.$http.put('api/assessments/' + this.$routeParams.id, body)
        .then(response => {
          //alert('Assessment saved');
          //console.log(response);
          //this.$location.path('/group3');
        });
      //}else{
      //alert('The Laptops and Desktops need to add up to the Workstations');
      //}
    }

  }

  angular.module('rappApp')
    .controller('RegulatoryCtrl', RegulatoryController);
})();
