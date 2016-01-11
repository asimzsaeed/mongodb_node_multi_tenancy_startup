'use strict';

module.exports = function createDirective() {
    return {
        controller: 'CreateCtrl',
        controllerAs: 'CreateCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./create.html')
    };
};