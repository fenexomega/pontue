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


    this.pegarPontosDaSemana = function(token,success_callback,error_callback){
      $http.get(URL,{
        headers:{
          "x-access-token": token
        }
      })
      .success(function(data, status, headers, config){
        success_callback(data,status);
      })
      .error(function(data, status, headers, config){
        if(error_callback != undefined)
          error_callback(data, status, headers, config);
      });

    }
}

services.service("PontoService", PontoService);
PontoService.$inject = ['$http','routes', 'AppToolkit'];
