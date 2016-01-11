'use strict';
function appConfig($httpProvider, $urlRouterProvider, $locationProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
}

appConfig.$inject = ['$httpProvider', '$urlRouterProvider', '$locationProvider'];
module.exports = appConfig;