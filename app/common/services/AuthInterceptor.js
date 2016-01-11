'use strict';
function AuthInterceptor($q, $window) {
 	return {
 	 	request: request,
 	 	response: response 
    };

    function request(config){
  		config.headers = config.headers || {};
		if ($window.sessionStorage.token) {
			config.headers['Authorization'] = 'Bearer ' +  $window.sessionStorage.token;
			config.headers['Content-Type'] = "application/json";
		}
		return config || $q.when(config);
	};

	function response(response){
   	 	return response || $q.when(response);
	};
};

AuthInterceptor.$inject = ['$q', '$window'];
module.exports = AuthInterceptor;


