'use strict';
var controllers = angular.module('mainApp.controllers');
var URL = "http://localhost:8080";

function LoginController($scope, LoginService)
{

}

LoginController.$inject = ['$scope','$interval','LoginService'];
controllers.controller('LoginController',LoginController);
