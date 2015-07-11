var bookingControllers = angular.module('bookingControllers',[]);

bookingControllers.controller('bookingNewController', function($http, Booking, Bookable, $routeParams) {
  var vm = this;

  vm.facilityName = $routeParams.facilityName;
  vm.notice = "";

  vm.booking = {
    date: "",
    timeSlotIds: []
  };

  Bookable.getByTypeName($routeParams.facilityName)
  .success(function(data, status, headers, config){
    vm.bookables = data.bookables;
  })
  .error(function(data, status, headers, config){
    vm.notice += "Bookings could not be fetched."
  });

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
