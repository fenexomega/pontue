'use strict';

  var constants = angular.module('mainApp.constants');

  function getRoutes(){

    var routes = {
        LOGIN : '/api/autenticar',
        PONTO : '/api/pontos',
        REGISTRAR: '/api/registrar', 
        USUARIO: '/api/usuario'     
    };
    return routes;
  }

  constants.constant('routes', getRoutes());
