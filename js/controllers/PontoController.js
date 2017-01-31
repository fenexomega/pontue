'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";
var timeoutRef;

function PontoController($scope, $interval, PontoService)
{
  $scope.dataDeHoje = new Date();
  var myMoment = moment($scope.dataDeHoje).locale('pt-br');
  $scope.myMoment = myMoment;
  $scope.dia_semana = myMoment.format('dddd');
  $scope.data_formatada = myMoment.format('LL');

  function incrementarData()
  {
    $scope.dataDeHoje.setSeconds($scope.dataDeHoje.getSeconds() + 1);
    var myMoment = moment($scope.dataDeHoje).locale('pt-br');
    $scope.hora = myMoment.format('h:mm:ss');
  }

  function configChart(){
    $scope.myChartObject = {};

    $scope.myChartObject.type = "BarChart";

    $scope.myChartObject.data = {
      "cols": [
        {id: "dia", label: "Dias da Semana", type: "string"},
        {id: "horas", label: "Total de Horas", type: "number"}
      ], 
      "rows": [
        {c: [
            {v: "Domingo"},
            {v: 2}
        ]},
        {c: [
          {v: "Segunda"},
          {v: 2}
        ]},
        {c: [
            {v: "Terça"},
            {v: 4}
        ]},
        {c: [
            {v: "Quarta"},
            {v: 2},
        ]},
        {c: [
            {v: "Quinta"},
            {v: 2},
        ]},
        {c: [
            {v: "Sexta"},
            {v: 1},
        ]},
        {c: [
            {v: "Sábado"},
            {v: 2},
        ]}
    ]
  };
    $scope.myChartObject.options = {
        'title': 'Total de Horas por Dia da Semana'
    };
  }

  $scope.init = function(){
    incrementarData();
    $interval(incrementarData,1000);
    configChart();
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

PontoController.$inject = ['$scope','$interval','PontoService'];
controllers.controller('PontoController',PontoController);