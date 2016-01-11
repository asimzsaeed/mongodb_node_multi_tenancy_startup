'use strict';

module.exports = angular.module('common.elements.publicFooter', [])
    .directive('publicFooter', function() {
        return {
            template: require('./public_footer.html'),
            restrict: 'EA',
            replace: true
        };
    });