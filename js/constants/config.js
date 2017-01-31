'use strict';

var constants = angular.module('mainApp.constants');

function getConfig(){
    var config = {
        serverAddress: ''
    };
    return config;
}

constants.constant('config', getConfig());