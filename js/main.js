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


app.run(function(amMoment,$rootScope,$route,$location, LoginService){
  // mudar localização para português brasileiro
  amMoment.changeLocale('pt-br');

  $rootScope.isUserAuthenticated = LoginService.isUserAuthenticated;
  $rootScope.token = localStorage.getItem('token');
  // BUG essa linha só tá aqui pq na diretiva não consigo chamar o NavbarController

  $rootScope.$on("$locationChangeStart", function(event, next, current){
    console.log($route.routes);
    for(var i in $route.routes)
    {
        if(next.indexOf(i) != -1)
        {
          if($route.routes[i].requireLogin && !LoginService.isUserAuthenticated())
          {

            $location.path("/login");
          }
        }
    }
  });


});

app.config(function($routeProvider,$locationProvider){
  $routeProvider
  .when('/login',{
    templateUrl: 'partials/login.html',
    controller: 'LoginController',
    requireLogin: false
  })
  .when('/registrar',{
    templateUrl: 'partials/registro.html',
    controller: 'RegistroController',
    requireLogin: false
  })
  .when('/inicio',{
    templateUrl: 'partials/inicio.html',
    controller: 'PontoController',
    requireLogin: true
  })
  .when('/historico',{
    templateUrl: 'partials/historico.html',
    controller: 'LoginController',
    requireLogin: true
  })
  .otherwise({
    redirectTo: '/inicio'
  });
  $locationProvider.html5Mode(true);
});
