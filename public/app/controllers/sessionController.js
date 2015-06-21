var sessionControllers = angular.module('sessionControllers',[]);

sessionControllers.controller('sessionLoginController', function($http, Session) {
  var vm = this;
  vm.message = "";
  vm.username = "";
  vm.password = "";

  vm.login = function() {
    Session.login({username: vm.username, password: vm.password})
    .success(function(data, status, headers, config){
      vm.message = "Login successful!";
    })
    .error(function(data, status, headers, config){
      if(status == 401){
        vm.message = "The username and password did not match. Please try again.";
      }
      else{
        vm.message = "There was an error, with HTTP response code " + status;
      }
    });
  };
});