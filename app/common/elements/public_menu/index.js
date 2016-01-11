'use strict';

module.exports = angular.module('common.elements.publicMenu', [])
    .directive('publicMenu', function() {
        return {
            template: require('./public_menu.html'),
            restrict: 'EA',
            replace: true
        };
    });