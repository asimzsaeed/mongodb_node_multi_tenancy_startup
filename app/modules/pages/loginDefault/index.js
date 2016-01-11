'use strict';
module.exports = angular.module('modules.pages.loginDefault', [])
    .directive('loginDefaultView', require('./loginDefaultDirective'))
    .controller('LoginDefaultCtrl', require('./LoginDefaultController'));