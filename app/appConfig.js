'use strict';
function appConfig($urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
}

appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];
module.exports = appConfig;