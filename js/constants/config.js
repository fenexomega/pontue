'use strict';

var constants = angular.module('mainApp.constants');

function getConfig(){
    var config = {
        serverAddress: 'https://localhost:8080/'
    };
    return config;
}

constants.constant('config', getConfig());
