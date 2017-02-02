'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";

function LoginController($scope, $location, LoginService)
{
  if(LoginService.isUserAuthenticated())
    $location.path("/");

  $scope.limpar = function(){
    delete $scope.aut;
  }

  $scope.login = function(){
    var senhaHash =  sha256($scope.aut.senha);
    var result = LoginService.realizarLogin($scope.aut.email,senhaHash);
    console.log(result);
  }
}

LoginController.$inject = ['$scope','$location','LoginService'];
controllers.controller('LoginController',LoginController);
