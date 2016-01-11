'use strict';

function commonInit($rootScope, $state) {
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitle = toState.data.pageTitle;
            $rootScope.pageDescription = toState.data.pageDescription;
            $rootScope.bodyClasses = toState.data.moduleClasses + ' ' + toState.data.pageClasses;
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

commonInit.$inject = ['$rootScope', '$state'];
module.exports = commonInit;