angular.module('bookableService', [])
.factory('Bookable', function($http){
  var factory = {};

  factory.all = function(){
    return $http.get('/api/bookables');
  };

  factory.getByTypeName = function(typeName){
    return $http.get('/api/bookables/by_type/' + typeName);
  };

  return factory;
});
