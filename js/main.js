'use strict';

var controllers = angular.module('mainApp.controllers',[]);
var services    = angular.module('mainApp.services',[]);
// var directives  = angular.module('mainApp.directives',[]);
// var constants   = angular.module('mainApp.constants',[]);

var app = angular.module("mainApp",[
  /* Módulos da aplicação */
  'ngRoute',

  /* Módulo Google Charts */
  'googlechart',

  /* Nossos módulos */
  'mainApp.controllers' ,'mainApp.services', //'mainApp.directives', 'mainApp.constants'
]);

app.config(function($routeProvider,$locationProvider){
  $routeProvider
  .when('/',{
    templateUrl: 'partials/inicio.html',
    controller: 'PontoController'
  })
  .when('/historico',{
    templateUrl: 'partials/historico.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);


})
