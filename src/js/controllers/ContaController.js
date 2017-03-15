'use strict';

var controllers = angular.module('mainApp.controllers');

function ContaController($scope, $rootScope, ContaService){
    
    $scope.alterarSenha = false;
    $scope.acaoSenha = 'Alterar Senha';

    $scope.init = function(){
        ContaService.buscarUsuario($rootScope.token)
        .then(function(response){
            console.log(response.data);
            $scope.usuario = response.data;
            $scope.usuario.matricula = parseInt($scope.usuario.matricula);
        },
        function(error){
            console.log(error);
        });
    };

    $scope.alterarSenhaToggle = function(){
        $scope.alterarSenha = !$scope.alterarSenha;
        if($scope.alterarSenha){
            $scope.acaoSenha = 'Cancelar';
        }else{
            $scope.acaoSenha = 'Alterar Senha';
        }
    };

    $scope.atualizarUsuario = function(usuario){
        if($scope.alterarSenha){

        }else{
            ContaService.atualizarUsuario($rootScope.token, usuario)
            .then(function(response){
                alert('Dados Atualizados!');
                console.log(response.data);
            },
            function(error){
                alert('Erro ao atualizar!');
                console.log(response.data);
            });
        }
    }

}

ContaController.$inject = ['$scope', '$rootScope','ContaService'];
controllers.controller('ContaController', ContaController);