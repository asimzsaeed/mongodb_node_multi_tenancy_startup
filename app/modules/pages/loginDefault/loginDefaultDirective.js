'use strict';

module.exports = function loginDefaultDirective() {
    return {
        controller: 'LoginDefaultCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./loginDefault.html')
    };
};