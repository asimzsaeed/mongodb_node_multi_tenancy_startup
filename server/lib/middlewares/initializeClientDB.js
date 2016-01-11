'use strict';
var config = require('../../config/config.json'),
  	mongoose = require('mongoose'),
    logger  = require('../../config/logger');

global.MongooseConnection = [];
global.ServiceRegestry = [];

// Initilize client DB connection 
module.exports = function(req, res, next) {
	var ClientConnection;
	console.log('config.dbs.client_base + global.ActiveClientDB', config.dbs.client_base + req.subdomains[0]);
	if(global.MongooseConnection[req.subdomains[0]]) {
		 console.log('Open mongo connection for pool:', req.subdomains[0]);
		 ClientConnection = global.MongooseConnection[req.subdomains[0]];
		 global.ActiveClientMongooseConnection = ClientConnection;
	} else {
		console.log('create new mongo connection for:', req.subdomains[0]);
		ClientConnection =  mongoose.createConnection(config.dbs.client_base + req.subdomains[0] + config.dbs.client_db_sufix);
		global.MongooseConnection[req.subdomains[0]] = ClientConnection;

		 //Initialize Modules for connection
		var models = require('../../lib/models');
		models.initialize(ClientConnection);

		//Initilize Services for connection
		var services = require('../../lib/Services');
		services.initialize(ClientConnection);

		global.ActiveClientMongooseConnection = ClientConnection;
	}

	ClientConnection.on('connected', function () {
		console.log('Mongoose default connection open to  ' + req.subdomains[0]);
	});
	// When the connection is disconnected
	ClientConnection.on('disconnected', function () {
		console.log('Mongoose ' + req.subdomains[0] + ' connection disconnected');
	});

	// When error
	ClientConnection.on('error', function (error) {
		console.log('Mongoose error>>' + req.subdomains[0] + ':', error);
		// No user with this name exists, respond back with a 401
		delete req.user;
		res.status(401);
		res.json({ 'status': 401, 'message': config.message.invalidCredentials});
	});
	next(); 
}