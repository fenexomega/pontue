'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";

function RegistroController($scope, $location,$rootScope, LoginService)
{
  $scope.registrar = function(usuario){

    if(usuario.senha != usuario.confirmacao)
    {
      // TODO pôr erro do bootstrap
      alert("Senhas não conferem");
    }

    delete usuario.confirmacao;

    LoginService.registrarUsuario(usuario)
      .then(function(response){
        alert("Registrado com sucesso.");
        $location.path('/login');
      },function(response){
        // TODO erro no cadastro
        alert("Ocorreu um erro. Tente novamente");
      });
  }

  $scope.cancelar = function()
  {
    $location.path('/login');
  }


}

RegistroController.$inject = ['$scope','$location','$rootScope', 'LoginService'];
controllers.controller('RegistroController',RegistroController);
