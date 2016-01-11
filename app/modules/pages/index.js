'use strict';

module.exports = angular.module('modules.pages', [
        require('./about').name,
        require('./create').name,
        require('./loginDefault').name,
        require('./login').name,
    ])
    .config(require('./pagesRoutes'))
    .controller('PagesCtrl', require('./PagesController'));