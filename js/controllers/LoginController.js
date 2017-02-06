'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";

function LoginController($scope, $location,$rootScope, LoginService)
{
  if(LoginService.isUserAuthenticated() && $location.path() == "/login")
    $location.path("/inicio");

  $scope.limpar = function(){
    delete $scope.aut;
  }

  $scope.login = function(){
    var senhaHash =  sha256($scope.aut.senha);
    var result = LoginService.realizarLogin($scope.aut.email,senhaHash);
    result.then(function(response){
      console.log(response);
      localStorage.setItem('token',response.data.token);
      $rootScope.token = response.data.token;
      $location.path("/");
    },function(response){
      // TODO o que acontece se o login não der certo

    });
    console.log(result);
  }
}

LoginController.$inject = ['$scope','$location','$rootScope', 'LoginService'];
controllers.controller('LoginController',LoginController);
