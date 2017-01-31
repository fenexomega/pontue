'use strict';

  var constants = angular.module('mainApp.constants');

  function getRoutes(){

    var routes = {
        LOGIN : '/api/autenticar'      
    };
    return routes;
  }

  constants.constant('routes', getRoutes());