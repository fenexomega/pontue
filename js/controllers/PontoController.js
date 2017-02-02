'use strict';
var controllers = angular.module('mainApp.controllers');

function PontoController($scope, $interval, $rootScope, PontoService, moment) {

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

    $scope.dataDeHoje = new Date();

    var myMoment = moment($scope.dataDeHoje).locale('pt-br');

    $scope.myMoment = myMoment;
    $scope.dia_semana = myMoment.format('dddd');
    $scope.data_formatada = myMoment.format('LL');

    incrementarData();
    $interval(incrementarData, 1000);
    configChart();

    $scope.Enviar = function(){
        alert("Enviar");
    };

    $scope.afsdfds = function(){
        alert("afsdfds");
    };

    $scope.pegarHorasDaSemana = function() {
        console.log("Pegando horas da semana!");
        PontoService.pegarPontosDaSemana(token,
            function(data, status) {
                $scope.horasSemana = data.horas;
                $scope.semana = data.semana;
            },
            //On Error
            function(data, status) {
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
         console.log("Submetendo horas");
        PontoService.enviarPonto(ponto,$rootScope.token).then(
          function(response){
            alert('Ponto enviado');
            $scope.ponto = response.data;
          },
          function(response){

          });
    };


};

PontoController.$inject = ['$scope', '$interval', '$rootScope', 'PontoService', 'moment'];
controllers.controller('PontoController', PontoController);
