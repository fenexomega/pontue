'use strict';

 var directives = angular.module('mainApp.directives');

 function Navbar() {
   return {
     restrict: 'AE',
     templateUrl: 'partials/directives/navbar.html',
     controller: 'NavbarController'
   };
 }

 Navbar.$inject = [];

 directives.directive('navbar', Navbar);
