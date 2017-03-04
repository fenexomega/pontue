'use strict';
var controllers = angular.module('mainApp.controllers');

function PontoController($scope, $interval, $rootScope, PontoService, moment) {


  var pegarPontoDeHoje = function(){
    PontoService.pegarPontoDeHoje($rootScope.token).then(function(response){
      $scope.ponto = response.data;
      console.log($scope.ponto);
    },function(error){
      alert("Não foi possível pegar o ponto");
    });

  }

  var incrementarData = function() {
    $scope.dataDeHoje.setSeconds($scope.dataDeHoje.getSeconds() + 1);
    var myMoment = moment($scope.dataDeHoje);
    $scope.hora = myMoment.format('h:mm:ss');
  };

  var configChart = function() {
    $scope.myChartObject = {};
    $scope.myChartObject.type = "BarChart";
    $scope.myChartObject.data = {
      "cols": [{
        id: "dia",
        label: "Dias da Semana",
        type: "string"
      },
      {
        id: "horas",
        label: "Total de Horas",
        type: "number"
      }
    ],
    "rows": [{
      c: [{
        v: "Domingo"
      },
      {
        v: 2
      }
    ]
  },
  {
    c: [{
      v: "Segunda"
    },
    {
      v: 2
    }
  ]
},
{
  c: [{
    v: "Terça"
  },
  {
    v: 4
  }
]
},
{
  c: [{
    v: "Quarta"
  },
  {
    v: 2
  },
]
},
{
  c: [{
    v: "Quinta"
  },
  {
    v: 2
  },
]
},
{
  c: [{
    v: "Sexta"
  },
  {
    v: 1
  },
]
},
{
  c: [{
    v: "Sábado"
  },
  {
    v: 2
  },
]
}
]
};
$scope.myChartObject.options = {
  'title': 'Total de Horas por Dia da Semana'
};
};

$scope.pegarHorasDaSemana = pegarHorasDaSemana;

  function pegarHorasDaSemana() {
  var numeroSemana = myMoment.format('ww');
  var ano = myMoment.format('YYYY');
  console.log("Pegando horas da semana!");
  PontoService.pegarPontosDaSemana($rootScope.token,numeroSemana,ano).then(
    function(response) {
      var i = 0;
      for (var semana of response.data) {
        i += semana.horasDia;
      }
      $scope.horas_completas_semana = i;
    },
    //On Error
    function(response) {
      // TODO o que acontece quando dá erro
    });
  };



  $scope.submeterHorasDoDia = function(ponto) {
    // Objeto é um json no seguinte formato
    /*
    *  {
    *    "comentario":"",
    *     "horarios":{
    *      "manha":{
    *      "ab": false,
    *      "cd":false
    *      },
    *      "tarde":{
    *      "ab":false,
    *      "cd":false
    *      },
    *      "noite":{
    *      "ab":false,
    *      "cd":false
    *      }
    *    }
    *  }
    */

    var funcao;
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

  PontoController.$inject = ['$scope', '$interval', '$rootScope', 'PontoService', 'moment'];
  controllers.controller('PontoController', PontoController);
