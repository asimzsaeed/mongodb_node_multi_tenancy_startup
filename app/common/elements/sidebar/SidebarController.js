'use strict';
 
function SidebarCtrl($scope) {
	var vm = this;
    vm.pinned = true;
}

 
SidebarCtrl.$inject = ['$scope'];
module.exports = SidebarCtrl;