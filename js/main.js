'use strict';

var controllers = angular.module('mainApp.controllers',[]);
var services    = angular.module('mainApp.services',[]);
var constants   = angular.module('mainApp.constants',[]);
var directives  = angular.module('mainApp.directives',[]);

var app = angular.module("mainApp",[
  /* Módulos da aplicação */
  'ngRoute', 'angularMoment',

  /* Módulo Google Charts */
  'googlechart',

  /* Nossos módulos */
  'mainApp.controllers' ,'mainApp.services', 'mainApp.constants', 'mainApp.directives'
]);


app.run(function(amMoment){
  amMoment.changeLocale('pt-br');
});

app.config(function($routeProvider,$locationProvider){
  $routeProvider
  .when('/',{
    templateUrl: 'partials/inicio.html',
    controller: 'PontoController'
  })
  .when('/historico',{
    templateUrl: 'partials/historico.html',
    controller: 'LoginController'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
});
