'use strict';
var services = angular.module('mainApp.services');

function PontoService($http)
{
  this.enviarPonto = function(pontos,success_callback,error_callback){
    var parametro = JSON.stringify(pontos);
    $http.post(URL,parametro)
    .success(function(data, status, headers, config){
      success_callback(data,status);
    })
    .error(function(data, status, headers, config){
      if(error_callback != undefined)
        error_callback(data, status, headers, config);
    });

    this.pegarPontosDaSemana = function(token,success_callback,error_callback){
      $http.get(URL,{
        params:{
          "x-auth-token": token
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
}

services.service("PontoService",PontoService);

PontoService.$inject = ['$http'];
