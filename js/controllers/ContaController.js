'use strict';

var controllers = angular.module('mainApp.controllers');

function ContaController($scope, $rootScope, ContaService){

    $scope.init = function(){
        ContaService.buscarUsuario($rootScope.token)
        .then(function(response){
            console.log(response.data);
            $scope.usuario = response.data;
        },
        function(error){
            console.log(error);
        });

    }

}

ContaController.$inject = ['$scope', '$rootScope','ContaService'];
controllers.controller('ContaController', ContaController);