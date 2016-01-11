'use strict';

module.exports = function customerDirective() {
    return {
        controller: 'CustomerCtrl',
        controllerAs: 'vmCustomerCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./index.html')
    };
};