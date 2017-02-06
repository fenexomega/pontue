'use strict';
var services = angular.module('mainApp.services');

function PontoService($http,routes, AppToolkit)
{

  var PONTO = AppToolkit.serviceAddress(routes.PONTO);

  this.enviarPonto = function(ponto,token){
    var parametro = JSON.stringify(ponto);
    return $http.post(PONTO,parametro,{
      headers:{
        "x-access-token": token
      }
    });
  }

    this.pegarPontosDaSemana = function(token,semanaNum){
      return $http.get(URL,{
        headers:{
          "x-access-token": token
        }
      });

    }
}

services.service("PontoService", PontoService);
PontoService.$inject = ['$http','routes', 'AppToolkit'];
