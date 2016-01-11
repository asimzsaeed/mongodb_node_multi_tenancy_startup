'use strict';

function homeRoutes($stateProvider) {

    var home = {
        name: 'home',  
        url: '/',  
        template: '<div home-view></div>',
        data: {
            moduleClasses: 'page',  
            pageClasses: 'home', 
            pageTitle: 'Home', 
            pageDescription: 'Meta Description goes here'
        }
    };

    $stateProvider.state(home);

}

homeRoutes.$inject = ['$stateProvider'];
module.exports = homeRoutes;