'use strict';
var controllers = angular.module('mainApp.controllers');

function PontoController($scope, $interval, $rootScope, $route, PontoService, moment) {

  var pegarPontoDeHoje = function(){
    PontoService.pegarPontoDeHoje($rootScope.token).then(function(response){
      $scope.ponto = response.data;
      console.log($scope.ponto);
    },function(error){
      // SERVER OFFLINE?
      if(error.status == -1)
      {
        alert("Servidor offline. Clique OK para carregar novamente");
        $route.reload();
      }
      else {
        alert("Não foi possível pegar o ponto");
      }
      console.log(error);
    });

  }

  var incrementarData = function() {
    $scope.dataDeHoje.setSeconds($scope.dataDeHoje.getSeconds() + 1);
    var myMoment = moment($scope.dataDeHoje);
    $scope.hora = myMoment.format('HH:mm:ss');
  };

  var configChart = function() {

};

$scope.pegarHorasDaSemana = pegarHorasDaSemana;

  function pegarHorasDaSemana() {
  var numeroSemana = myMoment.format('ww');
  var ano = myMoment.format('YYYY');
  console.log("Pegando horas da semana!");
  PontoService.pegarPontosDaSemana($rootScope.token,numeroSemana,ano).then(
    // on Success
    function(response) {
      var i = 0;
      for (var semana of response.data) {
        i += semana.horasDia;
      }
      $scope.horas_completas_semana = i;
      var factory = new SemanaChartFactory();
      factory.setTitle("Total de Horas");
      factory.setData(response.data);
      $scope.chart = factory.create();
      console.log($scope.chart);
    },
    //On Error
    function(response) {
      // TODO o que acontece quando dá erro
    });
  };

  function validateInput()
  {
    console.log($scope.ponto);
    var validade;
    var ponto = $scope.ponto;
    if(ponto.comentario == '' || ponto.comentario == undefined)
      return false;

    for(var horario in ponto.horarios)
    {
      for(var turno in horario)
      {
        if( turno == true)
          return true;
      }
    }

    return false;
  };


  $scope.submeterHorasDoDia = function(ponto) {
    var funcao;

    // FIXME mostrar mensagem de erro no bootstrap
    if(validateInput() == false)
    {
      console.log("Não tem tudo preenchido");
      return;
    }

    if(ponto.hasOwnProperty("_id") == false)
      funcao = PontoService.enviarPonto;
    else
      funcao = PontoService.atualizarPonto;


    funcao(ponto,$rootScope.token).then(
      function(response){
        pegarHorasDaSemana();
        $scope.ponto = response.data;
      },
      function(response){

      });
    };

    $scope.dataDeHoje = new Date();
    var myMoment = moment($scope.dataDeHoje).locale('pt-br');
    $scope.myMoment = myMoment;
    $scope.dia_semana = myMoment.format('dddd');
    $scope.data_formatada = myMoment.format('LL');

    pegarPontoDeHoje();
    incrementarData();
    $interval(incrementarData, 1000);
    pegarHorasDaSemana();
    configChart();
  };

  PontoController.$inject = ['$scope', '$interval', '$rootScope', '$route', 'PontoService', 'moment'];
  controllers.controller('PontoController', PontoController);
