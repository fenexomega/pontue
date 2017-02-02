'use strict';

var constants = angular.module('mainApp.constants');

function getConfig(){
    var config = {
        serverAddress: 'http://127.0.0.1:8080/'
    };
    return config;
}

constants.constant('config', getConfig());
