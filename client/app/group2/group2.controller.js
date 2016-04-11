'use strict';

(function() {
class Group2Controller {
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
    this.$scope.msgs = {};
    this.$scope.ra = {};
    this.progress = 5;
    this.$scope.section_title = 'Technology Planning and Major Projects';
    this.$http.defaults.headers.common['X-Assessment-Token'] = this.$cookies.get('ansaccess');
    if(!this.$routeParams.id){
      this.$location.path('/signup');
    }else{
      if(!this.$cookies.get('ansaccess')){
        this.$location.path('/signup');
      }else{
        this.$http.get('api/assessments/'+this.$routeParams.id)
          .then(response => {

            this.$scope.ra = response;
            this.ra = this.$scope.ra;

          });
      }
    }



  }

  save(){
    //if((parseFloat(this.$scope.ra.data.Desktops__c) + parseFloat(this.$scope.ra.data.Laptops__c)) != parseInt(this.$scope.ra.data.Workstations__c)){
    if(this.$scope.ra.data.Hardware_Under_Warranty__c == "true"){
      var body = {
        Id:this.$scope.ra.data.Id,
        Changes_Last_12_Months__c:this.$scope.ra.data.Changes_Last_12_Months__c,
        Upcoming_Changes__c:this.$scope.ra.data.Upcoming_Changes__c,
        Hardware_Replacement_Frequency__c:this.$scope.ra.data.Hardware_Replacement_Frequency__c,
        Hardware_Under_Warranty__c:this.$scope.ra.data.Hardware_Under_Warranty__c
      }
    }else{
      var body = {
        Id:this.$scope.ra.data.Id,
        Changes_Last_12_Months__c:this.$scope.ra.data.Changes_Last_12_Months__c,
        Upcoming_Changes__c:this.$scope.ra.data.Upcoming_Changes__c,
        Hardware_Replacement_Frequency__c:this.$scope.ra.data.Hardware_Replacement_Frequency__c,
        Hardware_Under_Warranty__c:this.$scope.ra.data.Hardware_Under_Warranty__c
      }
    }

        this.$http.put('api/assessments/'+this.$routeParams.id,body)
        .then(response => {
          alert('Assessment saved');
          //this.$location.path('/group3');
      });
    //}else{
      //alert('The Laptops and Desktops need to add up to the Workstations');
    //}
  }

}

angular.module('rappApp')
  .controller('Group2Ctrl', Group2Controller);
})();
