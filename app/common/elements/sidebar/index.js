'use strict';

module.exports = angular.module('common.elements.vizobSidebar', [])
    .directive('vizobSidebar', function() {
        return {
            controller: 'SidebarCtrl',
	        controllerAs: 'SidebarCtrl',
	        bindToController: true,
	        template: require('./sidebar.html'),
            restrict: 'EA',
            replace: true
        };
    })
    .controller('SidebarCtrl', require('./SidebarController'));