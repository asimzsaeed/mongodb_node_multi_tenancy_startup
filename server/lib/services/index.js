'use strict';
var SR = require('../../config/ServiceRegistry');
var services = {
    Customer: './customer'
};


module.exports = {
    initialize: function (ctx) {
        Object.keys(services).forEach(function (key) {
            //We are register services which we can used in out api/controllers
            var service = require(services[key]);
            service.prototype[key]  = ctx.model(key);
            SR.AddService(key,service);
        });
    },
    onInitialized: function (done) {
        console.log(done);
    },
    shutdown: function (done) {
		console.log(done);
    },

};