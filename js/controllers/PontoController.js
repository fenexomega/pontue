'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";
var timeoutRef;

function PontoController($scope,PontoService)
{

}

controllers.controller('PontoController',PontoController);

PontoController.$inject = ['$scope','PontoService'];
