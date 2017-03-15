'use strict';

var services = angular.module('mainApp.services');

function RegistroService($http, config, routes, AppToolkit){

    var REGISTRAR = AppToolkit.serviceAddress(routes.REGISTRAR);

    this.registrarUsuario = function(usuario)
    {
        return $http.post(REGISTRAR,usuario);
    };
    
}

services.service("RegistroService", RegistroService);
RegistroService.$inject = ['$http', 'config', 'routes', 'AppToolkit'];
