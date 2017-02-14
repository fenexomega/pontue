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

    }
    
}

services.service("ContaService", ContaService);
ContaService.$inject = ['$http', 'config', 'routes', 'AppToolkit'];
