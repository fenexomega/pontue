'use strict';
var controllers = angular.module('mainApp.controllers');

function NavbarController($scope, $location, $rootScope)
{
  // http://stackoverflow.com/questions/16199418/how-to-set-bootstrap-navbar-active-class-with-angular-js
  $scope.isActive = function(viewLocation)
  {
    return $location.path().indexOf(viewLocation) == 0;
  }

  $scope.logout = function()
  {
      $rootScope.token = undefined;
      localStorage.removeItem('token');
      $location.path('/login');
    };
}

NavbarController.$inject = ['$scope','$location', '$rootScope'];
controllers.controller('NavbarController',NavbarController);
