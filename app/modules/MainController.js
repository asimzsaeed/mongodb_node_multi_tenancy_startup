'use strict';
function MainCtrl($rootScope, $scope) {
    $scope.test = null;
    console.log('Up and running!');
}


MainCtrl.$inject = ['$rootScope', '$scope'];
module.exports = MainCtrl;