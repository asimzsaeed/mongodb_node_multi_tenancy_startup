'use strict';

module.exports = angular.module('modules.home', [])
    .directive('homeView', require('./homeDirective'))
    .controller('HomeCtrl', require('./HomeController'))
    .config(require('./homeRoutes'));