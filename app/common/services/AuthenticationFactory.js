'use strict';

function AuthenticationFactory($q, $window) {
 	var auth = {
    isLogged: false,
    check: function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  }
  return auth;
};

AuthenticationFactory.$inject = ['$q', '$window'];
module.exports = AuthenticationFactory;


