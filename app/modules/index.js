'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./customer').name,
        require('./pages').name // Used for static content pages like "About", "Privacy Policy", "404", etc.
    ])
    .controller('MainCtrl', require('./MainController'));