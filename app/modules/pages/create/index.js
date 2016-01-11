'use strict';
// Home View
module.exports = angular.module('modules.pages.create', [])
    .directive('createView', require('./createDirective'))
    .controller('CreateCtrl', require('./CreateController'));