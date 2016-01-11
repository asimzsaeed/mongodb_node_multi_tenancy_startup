'use strict';

var CONSTANTS = (function() {
    return {
		API_BASE : '/api/',
		REST_BASE : '/',
		successMessage: 'You have successfully logged in.',
		failureMessage: 'Your username or password is incorrect.',
		key: 'value'
    };
}());

CONSTANTS.$inject = [];
module.exports = CONSTANTS;