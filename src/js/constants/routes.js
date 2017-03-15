'use strict';

  var constants = angular.module('mainApp.constants');

  function getRoutes(){

    var routes = {
        LOGIN : '/api/autenticar',
        PONTO : '/api/pontos',
        REGISTRAR: '/api/registrar',
        USUARIO: '/api/usuario',
        USUARIO_VALIDO: '/api/usuario/valido'     
    };
    return routes;
  }

  constants.constant('routes', getRoutes());
