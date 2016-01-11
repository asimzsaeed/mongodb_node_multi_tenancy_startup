'use strict';

module.exports = function loginDirective() {
    return {
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./login.html')
    };
};