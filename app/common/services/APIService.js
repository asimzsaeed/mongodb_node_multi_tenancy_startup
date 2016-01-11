'use strict';

function APIService($http, CONSTANTS) {
	var API_BASE = CONSTANTS.API_BASE;

	 return {
	 	get: get,
	 	post: APIService.prototype.post,
	 	put: APIService.prototype.put 
    };

    function get(url, config){
		console.log('APIService.prototype.get',url, config);
		config = addApiHeaders(config);
    return $http.get(API_BASE + url, config);
	};

    function addApiHeaders(config) {
    	if(!config) {
    		config = {};
    		config.headers = {};
    	}
    	

        //angular.extend(config.headers, getAuthHeaders());
        //angular.extend(config.headers, getExtraHeaders());
        return config;
    };
}

APIService.$inject = ['$http', 'CONSTANTS'];
module.exports = APIService;

/*APIService.prototype.get = function (url, config){
	console.log('APIService.prototype.get',url, config);
	config = addApiHeaders(config);
    return $http.get(API_BASE + url, config);
};
*/
APIService.prototype.post = function (url, data, config){
   config = addApiHeaders(config);
   return $http.post(API_BASE + url, data, config);
};

APIService.prototype.put = function(url, data, config) {
   config = addApiHeaders(config);
   return $http.put(API_BASE + url, data, config);
};

APIService.prototype.delete = function (url, config) {
   config = addApiHeaders(config);
   return $http.delete(API_BASE + url, config);
};
