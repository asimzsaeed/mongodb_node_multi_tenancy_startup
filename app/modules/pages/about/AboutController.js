'use strict';

function AboutCtrl($scope) {
    $scope.aboutVar = 'This is an example of a sub-module.';
}

AboutCtrl.$inject = ['$scope'];
module.exports = AboutCtrl;