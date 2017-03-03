'use strict';

var services = angular.module('mainApp.services');

function ContaService($http, config, routes, AppToolkit){

    var USUARIO = AppToolkit.serviceAddress(routes.USUARIO);

    this.buscarUsuario = function(token){

        var req = {
            method: 'GET',
            url: USUARIO,
            headers: {
                'x-access-token': token
            }
        };

        return $http(req);

    };

    this.atualizarUsuario = function(token, usuario){

        var req = {
            method: 'PUT',
            url: USUARIO+'s', //Corrigir rota do server
            headers: {
                'x-access-token': token
            },
            data: usuario
        };

        return $http(req);

    };
    
}

services.service("ContaService", ContaService);
ContaService.$inject = ['$http', 'config', 'routes', 'AppToolkit'];
