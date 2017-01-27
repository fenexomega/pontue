'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";
var timeoutRef;

function PontoController($scope,PontoService)
{
  $scope.dataDeHoje = new Date();

  function ajustarVarDeData()
  {
    $scope.dataDeHoje = new Date();
    var myMoment = moment($scope.dataDeHoje).locale('pt-br');
    $scope.data_formatada = myMoment.format('LL');
  }

  $scope.init = function(){
    ajustarVarDeData();
    setInterval(1000,ajustarVarDeData);
  }


  $scope.pegarHorasDaSemana = function(){
    PontoService.pegarPontosDaSemana(token,
    function(data,status){
      $scope.horasSemana = data.horas;
      $scope.semana = data.semana;
    },
    //On Error
    function(data,status){
      // TODO o que acontece quando dá erro
    }

  );

  $scope.submeterHorasDoDia = function(objeto)
  // Objeto é um json no seguinte formato
  /*
   *  {
   *    "comentario":"",
   *     "horarios":{
   *      "manha":{
   *      "ab":0,
   *      "cd":0
   *      },
   *      "tarde":{
   *      "ab":0,
   *      "cd":0
   *      },
   *      "noite":{
   *      "ab":0,
   *      "cd":0
   *      }
   *    }
   *  }
   */
  {
    PontoService.enviarPonto(objeto,
    function(data,status){

    },
    function(data,status){

    });
  }


  }
}

controllers.controller('PontoController',PontoController);

PontoController.$inject = ['$scope','PontoService'];
