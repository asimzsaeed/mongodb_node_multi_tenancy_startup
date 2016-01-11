'use strict';

module.exports = angular.module('modules.customer', [])
    .directive('customerView', require('./customerDirective'))
    .controller('CustomerCtrl', require('./CustomerController'))
    .config(require('./customerRoutes'));