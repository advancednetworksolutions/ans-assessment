'use strict';

(function() {
class CompanyController {
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
    this.progress = 0;
    this.$scope.savedChanges = true;
    this.changesMade = false;
    this.$scope.section_title = 'Business Information';
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

            var vm = this;
            this.$scope.$watch('ra.data', function(newVal,oldVal) {
              console.log(oldVal);
              console.log(newVal);
              if(newVal != oldVal){
                vm.$scope.savedChanges = false;
                vm.changesMade = true;
                console.log(vm.$scope.savedChanges);
                console.log(vm.$scope.changesMade);
              }
            },true);

            this.$scope.$on('$routeChangeStart', function(event,next, current) {
               if(!vm.$scope.savedChanges){
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

  save(){
      //if((parseFloat(this.$scope.ra.data.Desktops__c) + parseFloat(this.$scope.ra.data.Laptops__c)) != parseInt(this.$scope.ra.data.Locations__c)){
        var body = {
          Id:this.$scope.ra.data.Id,
          Locations__c:this.$scope.ra.data.Locations__c,
          Employees__c:this.$scope.ra.data.Employees__c,
          Servers__c:this.$scope.ra.data.Servers__c,
          Business_Comments__c:this.$scope.ra.data.Business_Comments__c
        }
        this.$scope.savedChanges = true;
        this.$scope.changesMade = false;
        this.$http.put('api/assessments/'+this.$routeParams.id,body)
        .then(response => {
          this.$location.path('/group2');
      });
    //}else{
      //alert('The Laptops and Desktops need to add up to the Workstations');
    //}
  }

}

angular.module('rappApp')
  .controller('CompanyCtrl', CompanyController);
})();
