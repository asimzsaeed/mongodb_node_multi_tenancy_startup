'use strict';

module.exports = angular.module('common.elements.vizobNavbar', [])
    .directive('vizobNavbar', function() {
        return {
            template: require('./navbar.html'),
            restrict: 'EA',
            replace: true
        };
    });