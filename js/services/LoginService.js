'use strict';

var services = angular.module('mainApp.services');

function LoginService($http, config, routes, AppToolkit){

    var LOGIN = AppToolkit.serviceAddress(routes.LOGIN);

    this.realizarLogin = function(email, senha){

        var params = {
            email: email,
            senha: senha
        };

        var req = {
            method : 'POST',
            url : LOGIN,
            data : params,
            headers: {
              'Content-Type': 'application/json'
            }
        };

        console.log(req);
        // FIXME esse método não funciona

        console.log(LOGIN);

        return $http.post(LOGIN,params);

    };

    this.isUserAuthenticated = function()
    {
      return localStorage.getItem("token") != undefined;
    };

}

services.service("LoginService", LoginService);
LoginService.$inject = ['$http', 'config', 'routes', 'AppToolkit'];
