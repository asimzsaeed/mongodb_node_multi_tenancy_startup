 'use strict';
var Promise = require('bluebird'),
  	errorhandler = require('../../../lib/middlewares/errorhandler'),
   	userService = require('./../../services/user'),
    UserService = new userService();

var logger  = require('../../../config/logger');

module.exports.query = function (req, res) {
	var promise = UserService.GetByQuery();
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
      logger.error('UserService>>query>>', err);
      errorhandler.SendError(req, res);
    });
};


module.exports.me = function (req, res) {
	var promise = UserService.GetByQuery();
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
      logger.error('UserService>>query>>', err);
      errorhandler.SendError(req, res);
    });
};


module.exports.findOne = function (req, res) {
    var promise = UserService.GetById(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('UserService>>query>>', err);
    	errorhandler.SendError(req, res);
    });
};


module.exports.create = function (req, res) {
    var customer = {};
    customer.name = req.body.name;

    var promise = UserService.Create(customer);
    promise.then(function(data) {
    	return res.status(201).json(data);
    })
    .catch(function(err){
    	errorhandler.SendError(req, res);
    });
};


module.exports.update = function (req, res) {
    var promise = UserService.Update(req.params.id, req.body);
    promise.then(function(data) {
      	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('UserService>>update>>', err);
    	errorhandler.SendError(req, res);
    });
};

module.exports.delete = function (req, res) {
  	var promise = UserService.MarkAsDelete(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json('Resource has been deleted');
    })
    .catch(function(err){
    	logger.error('UserService>>delete>>', err);
    	errorhandler.SendError(req, res);
    });
};

