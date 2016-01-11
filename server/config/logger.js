'use strict';
var logger,
	bunyan = require('bunyan'),
	config = require('./config.json');

module.exports = {
    initialize: function () {
    	if(!logger) {
	    	  logger = bunyan.createLogger({
			  name: config.logging.name,
			  serializers: {
			        req: bunyan.stdSerializers.req,
			        err: bunyan.stdSerializers.err
			   },
			  streams: [config.logging.streams]
			});
            logger.info("initialize logger::", config.logging.name)
    	}
	},
    log: function (_log) {
    	this.initialize();
    	logger.info(_log);
    },
	info: function (_log) {
    	this.initialize();
    	logger.info(_log);
    },
    warn: function (_log) {
    	this.initialize();
    	logger.warn(_log);
    },
    error: function (_log) {
    	this.initialize();
    	logger.error(_log);
    },
    trace: function (_log) {
    	this.initialize();
    	logger.trace(_log);
    },
    debug: function (_log) {
    	this.initialize();
    	logger.debug(_log);
    }

}
