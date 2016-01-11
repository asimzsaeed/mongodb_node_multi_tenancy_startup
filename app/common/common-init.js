'use strict';

function commonInit($rootScope, $state, $window, $location, AuthenticationFactory) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();

    $rootScope.$state = $state;

    $rootScope.$on("$stateChangeStart", function(event, toState) {
    if ((toState.access && toState.access.requiredLogin) && !AuthenticationFactory.isLogged) {
        $location.path("/login");
    } else {
        // check if user object exists else fetch it. This is incase of a page refresh
        if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
        //if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $rootScope.isPublic = toState.data.isPublic;
            $rootScope.pageTitle = toState.data.pageTitle;
            $rootScope.pageDescription = toState.data.pageDescription;
            $rootScope.bodyClasses = toState.data.moduleClasses + ' ' + toState.data.pageClasses;
        }

        $rootScope.showMenu = AuthenticationFactory.isLogged;
        //$rootScope.role = AuthenticationFactory.userRole;
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
            console.log('$location.path(/Loader);');
            $location.path('/Loader');
        }

    });

    $rootScope.$on('$viewContentLoaded', function() {
        if (document.readyState === 'complete') {
            window.scrollTo(0, 0);
        }
    });

    // Proper Regex Pattern for email input form validation
    $rootScope.emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

}

commonInit.$inject = ['$rootScope', '$state', '$window', '$location', 'AuthenticationFactory'];
module.exports = commonInit;

