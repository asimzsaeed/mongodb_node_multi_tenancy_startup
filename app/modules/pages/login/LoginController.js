'use strict';

function LoginCtrl($scope, $log, $window, $location, SignupService, AuthenticationFactory) {
    var vm = this;
    vm.Login = Login;
    
    function Login (user) {
        SignupService.Login(user)
         .then(function(res) {
            $log.info('LoginCtrl>>Login>>', res);

            AuthenticationFactory.isLogged = true;
            AuthenticationFactory.user = res.data.user.username;
            //AuthenticationFactory.userRole = data.user.role;

            $window.sessionStorage.token = res.data.token;
            $window.sessionStorage.user = res.data.user.username; // to fetch the user details on refresh
            //$window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

            $location.path("/loader");
        })
        .catch(function(err){
            $log.error('LoginCtrl>>Login>>', err);
        }); 
    }
}

LoginCtrl.$inject = ['$scope', '$log', '$window', '$location', 'SignupService', 'AuthenticationFactory'];
module.exports = LoginCtrl;