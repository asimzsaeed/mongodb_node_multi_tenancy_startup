'use strict';
'use strict';
 
function HomeCtrl($scope) {
    $scope.testVar = 'We are up and running using a required module!';
}

 
HomeCtrl.$inject = ['$scope'];
module.exports = HomeCtrl;