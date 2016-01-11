window.jQuery = window.$ = require('jquery');
window._ = require('lodash');

require('angular-bootstrap');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('domready/ready');
require('lodash');
require('restangular');

module.exports = angular.module('common',
    [
        'ui.bootstrap',
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'restangular',
        require('./elements/navbar').name,
        require('./elements/sidebar').name,
        require('./constants').name,
        require('./directives').name,
        require('./resources').name,
        require('./services').name
    ]);
