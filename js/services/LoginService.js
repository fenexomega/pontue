'use strict';

var services = angular.module('mainApp.services');

function LoginService($http, $rootScope, config, routes, AppToolkit){

    var LOGIN = AppToolkit.serviceAddress(routes.LOGIN);
    var USUARIO_VALIDO = AppToolkit.serviceAddress(routes.USUARIO_VALIDO);

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

    this.autoSetIfUserValid = function()
    {
        var token = localStorage.getItem('token');
        $http.get(USUARIO_VALIDO,{
          headers: {
            'x-access-token': token
          }
        }).then(function(response){
          // se o usuário for válido, faça nada
        },function(response){
          // se for inválido, exclua tudo
          localStorage.removeItem('token');
          $rootScope.token = undefined;
        });
    }

}

services.service("LoginService", LoginService);
LoginService.$inject = ['$http','$rootScope', 'config', 'routes', 'AppToolkit'];
