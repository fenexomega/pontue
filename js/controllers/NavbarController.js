'use strict';
var controllers = angular.module('mainApp.controllers');

function NavbarController($scope, $location, $rootScope)
{
  $scope.logout = function()
  {
      $rootScope.token = undefined;
      localStorage.removeItem('token');
      $location.path('/login');
    };
}

NavbarController.$inject = ['$scope','$location', '$rootScope'];
controllers.controller('NavbarController',NavbarController);
