'use strict';
module.exports = angular.module('modules.pages.login', [])
    .directive('loginView', require('./loginDirective'))
    .controller('LoginCtrl', require('./LoginController'));