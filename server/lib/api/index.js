'use strict';
var apiHandlers = {
	users:'./users',
	customer: './customer'
};


module.exports = {
    initialize: function (server) {
        Object.keys(apiHandlers).forEach(function (key) {
        	server.use('/api/' + key, require(apiHandlers[key]));
        });
    }
};