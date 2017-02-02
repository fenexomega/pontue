'use strict';

var services = angular.module('mainApp.services');

function LoginService($http, config, routes, AppToolkit){

    var LOGIN = AppToolkit.serviceAddress(routes.LOGIN);

    this.realizarLogin = function(email, senha){

        var params = {
            email : email,
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

        $http.post(LOGIN,params)
          .then(function(response){
            console.log('DEU CERTO: ' + response);
        },function(error){
          console.log(error);
        });

    };

    this.isUserAuthenticated = function()
    {
      return localStorage.getItem("user") != undefined;
    };

}

services.service("LoginService", LoginService);
LoginService.$inject = ['$http', 'config', 'routes', 'AppToolkit'];
