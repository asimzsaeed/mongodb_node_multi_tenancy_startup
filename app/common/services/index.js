'use strict';

// Services and Factories have their first letter capitalized like Controllers

module.exports = angular.module('common.services', [])
    .factory('APIService', require('./APIService.js'))
    .factory('RESTService', require('./RESTService.js'))
    .factory('CustomerService', require('./CustomerService.js'))
    .factory('AuthenticationFactory', require('./AuthenticationFactory.js'))
    .factory('AuthInterceptor', require('./AuthInterceptor.js'))
    .factory('SignupService', require('./SignupService.js'))
    ;