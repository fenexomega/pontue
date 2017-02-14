'use strict';

var services = angular.module('mainApp.services');

function LoginService($http, config, routes, AppToolkit){

    var LOGIN = AppToolkit.serviceAddress(routes.LOGIN);

    this.realizarLogin = function(email, senha){

        var params = {
            email: email,
            senha: senha
        };

        return $http.post(LOGIN,params);

    };

    this.isUserAuthenticated = function()
    {
      return localStorage.getItem("token") != undefined;
    };

}

services.service("LoginService", LoginService);
LoginService.$inject = ['$http', 'config', 'routes', 'AppToolkit'];
