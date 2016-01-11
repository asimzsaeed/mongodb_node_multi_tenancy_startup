'use strict';

function pageRoutes($stateProvider) {

    var pages = {
        name: 'pages',
        abstract: true,  // This makes it so that the url for this route doesn't actually resolve
        url: '/pages',
        template: '<div ui-view></div>', // This injects a new ui-view that the about page directive is injected into
        controller: 'PagesCtrl'
    };

    var about = {
        name: 'pages.about',
        url: '^/about', // The ^ character makes this url override the parent url
        template: '<div about-view></div>',
        data: {
            isPublic :true,
            moduleClasses: 'page',
            pageClasses: 'about',
            pageTitle: 'About',
            pageDescription: 'Some description.'
        }
    };

    var create = {
        name: 'pages.create',
        url: '^/create', // The ^ character makes this url override the parent url
        template: '<div create-view></div>',
        data: {
            isPublic :true,
            moduleClasses: 'page',
            pageClasses: 'create',
            pageTitle: 'Signup',
            pageDescription: 'Some description.'
        }
    };


     var loginDefault = {
        name: 'pages.loginDefault',
        url: '^/login_default', //  
        template: '<div login-default-view></div>',
        data: {
            isPublic :true,
            moduleClasses: 'page',
            pageClasses: 'login',
            pageTitle: 'Login',
            pageDescription: 'Some description.'
        }
    };

    var login = {
        name: 'pages.login',
        url: '^/login', //  
        template: '<div login-view></div>',
        data: {
            isPublic :true,
            moduleClasses: 'page',
            pageClasses: 'login',
            pageTitle: 'Login',
            pageDescription: 'Some description.'
        }
    };


    $stateProvider.state(pages);
    $stateProvider.state(about);
    $stateProvider.state(create);
    $stateProvider.state(loginDefault);
    $stateProvider.state(login);
}

pageRoutes.$inject = ['$stateProvider'];
module.exports = pageRoutes;