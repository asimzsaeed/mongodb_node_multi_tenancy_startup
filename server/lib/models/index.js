'use strict';
var models = {
	Customer: './customer'
};

module.exports = {
    initialize: function (ctx) {
        Object.keys(models).forEach(function (key) {
        	ctx.model(key, require('./'+ models[key]));
        	
        });
    }
};