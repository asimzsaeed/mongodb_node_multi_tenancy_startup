'use strict';

function customerRoutes($stateProvider) {

    var route = {
        name: 'customer',  
        url: '/customer',  
        template: '<div customer-view></div>',
        access: { requiredLogin: true },
        data: {
            moduleClasses: 'customer',  
            pageClasses: 'customer', 
            pageTitle: 'Customer', 
            pageDescription: 'Customer, page'
        }
    };

    $stateProvider.state(route);

}

customerRoutes.$inject = ['$stateProvider'];
module.exports = customerRoutes;