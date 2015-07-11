var bookingControllers = angular.module('bookingControllers',[]);

bookingControllers.controller('bookingNewController', function($http, Booking, $routeParams) {
  var vm = this;

  vm.notice = "";

  vm.booking = {
    date: "",
    timeSlotIds: []
  };

  vm.submit = function(){
    Booking.create(vm.booking)
    .success(function(data, status, headers, config){
      vm.notice = "Booking successful";
    })
    .error(function(data, status, headers, config){
      vm.notice = "Booking failed: " + data.error;
    });
  };
});
