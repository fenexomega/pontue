'use strict';

var controllers = angular.module('mainApp.controllers');

function RegistroController($scope, $location,$rootScope, RegistroService)
{
  $scope.registrar = function(usuario){
    if(usuario.senha != usuario.confirmacao)
    {
      // TODO pôr erro do bootstrap
      alert("Senhas não conferem");
    }

    delete usuario.confirmacao;

    RegistroService.registrarUsuario(usuario)
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

RegistroController.$inject = ['$scope','$location','$rootScope', 'RegistroService'];
controllers.controller('RegistroController', RegistroController);
