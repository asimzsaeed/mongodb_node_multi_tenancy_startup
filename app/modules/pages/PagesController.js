'use strict';

function PagesCtrl($scope) {
    $scope.childModulesInheritThis = 'This text is inherited from the About page\'s parent scope (PagesCtrl).'; // child modules can inherit this
}

PagesCtrl.$inject = ['$scope'];
module.exports = PagesCtrl;