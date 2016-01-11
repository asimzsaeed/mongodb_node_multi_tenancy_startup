'use strict';

// Filenames for Constants are always UPPERCASE
// You can have as many files for constants as you require (ex: USER_ROLES, NOTIFICATIONS, etc)
// Constants are injected into controllers like any service or resource
module.exports = angular.module('common.constants', [])
    .constant('CONSTANTS', require('./CONSTANTS'));