'use strict';

module.exports = function aboutDirective() {
    return {
        controller: 'AboutCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./about.html')
    };
};