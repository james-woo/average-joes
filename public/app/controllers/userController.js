var userControllers = angular.module('userControllers',[]);

userControllers.controller('userIndexController', function($http, User) {
  var vm = this;

  User.all()
  .success(function(data, status, headers, config){
    vm.users = data.users;
  });
});

userControllers.controller('userShowController', function($http, $routeParams, User) {
  var vm = this;
  var username = $routeParams.username;
  vm.userEditUrl = "/users/" + username + "/edit"

  User.get(username)
  .success(function(data, status, headers, config){
    vm.user = data.user;
  })
});

userControllers.controller('userNewController', function($http, $location, User) {
  var vm = this;

  vm.success = ""; 

  vm.user = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    key: "",
    confirmed: "false",
    permissions: "user"
  };

  vm.submit = function(){
    User.create(vm.user)
    .then(function(data){
      if(data.data.success){
        vm.user.key = data.data.key;
        User.sendConfirmationEmail(vm.user.email, vm.user)
        vm.success = "success!";
        $location.path("/confirm");
      }
      else{
        vm.success = data.data.message;
      }
    });
  };
});

userControllers.controller('userEditController', function($http, User, $routeParams, $location) {
  var vm = this;
  vm.success = "";

  var originalUsername = $routeParams.username;

  User.get(originalUsername)
  .success(function(data, status, headers, config){
    vm.originalUser = data.user;
  })
  .error(function(data, status, headers, config){
    $location.path("/"); // redirect if the user cannot be found
  });

  vm.updatedUser = {
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  vm.submit = function(){
    User.update(vm.originalUser.username, vm.updatedUser)
    .success(function(data, status, headers, config){
      vm.success = "User updated successfully."
      $location.path("/users/" + data.updatedUser.username);
    })
    .error(function(data, status, headers, config){
      vm.success = "Unable to update user."
    });
  };
});

userControllers.controller('userDeleteController', function($http, User, CurrentUser, $location) {
  var vm = this;
  vm.success = "";

  vm.delete = function(user){
    User.delete(user.username)

    .success(function(data, status, headers, config){
      if(status == 200){
        // The user has been logged out. Update the current user
        CurrentUser.update();
      }
      vm.success = "User deleted successfully."
      $location.path("/users");
    })

    .error(function(data, status, headers, config){
      if(status == 404){
        vm.success = "User could not be found."
      }
      else{
        vm.success = "There was an error with code " + status;
      }
    });
  };
});
