'use strict';

function RESTService($http, CONSTANTS) {
	var API_BASE = CONSTANTS.REST_BASE;

	return {
	 	 get: get,
	 	 post: post,
	 	 put: put 
    };

    function get(url){
      	return $http.get(API_BASE + url);
	};

	function post(url, data){
   	 	return $http.post(API_BASE + url, data);
	};

	function put(url, data) {
   		return $http.put(API_BASE + url, data);
	};
}

RESTService.$inject = ['$http', 'CONSTANTS'];
module.exports = RESTService;
