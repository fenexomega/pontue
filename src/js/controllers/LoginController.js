'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";

function LoginController($scope, $location,$rootScope, LoginService, ContaService)
{
  if(LoginService.isUserAuthenticated() && $location.path() == "/login")
  {
    ContaService.buscarUsuario($rootScope.token)
        .then(function(response){
          // faça nada
          $location.path("/inicio");
        },function(response){
          // login já era
          $scope.limpar();
        });
  }

  $scope.limpar = function(){
    delete $scope.aut;
    localStorage.removeItem('token');
  }

  $scope.login = function(){
    var senhaHash =  sha256($scope.aut.senha);
    var result = LoginService.realizarLogin($scope.aut.email,senhaHash);
    result.then(function(response){
      console.log(response);
      localStorage.setItem('token', response.data.token);
      $rootScope.token = response.data.token;
      $location.path("/");
    },function(response){
      // o que acontece se o login não der certo
      console.log("ERRO NO LOGIN: ",response.data.mensagem);
      $scope.erro = "Login incorreto";
    });
    console.log(result);
  }


}

LoginController.$inject = ['$scope','$location','$rootScope', 'LoginService',
                      'ContaService'];
controllers.controller('LoginController',LoginController);
