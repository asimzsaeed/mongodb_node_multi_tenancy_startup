 'use strict';
var Promise = require('bluebird'),
	  errorhandler = require('../../../lib/middlewares/errorhandler'),
      SR = require('../../../config/ServiceRegistry');
   	//customerService = global.ServiceRegestry['Customer']; //require('./../../services/customer'),
    //console.log('global.ServiceRegestry[Customer]', global.ServiceRegestry['Customer']);
    //CustomerService = new customerService();

var logger  = require('../../../config/logger');


module.exports.query = function (req, res) {
	var promise = CustomerService.GetByQuery();
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
      logger.error('CustomerService>>query>>', err);
      errorhandler.SendError(req, res);
    });
};


module.exports.findOne = function (req, res) {
    var CustomerService  = SR.GetService('Customer');
    var promise = CustomerService.GetById(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('CustomerService>>query>>', err);
    	errorhandler.SendError(req, res);
    });
};


module.exports.create = function (req, res) {
    var CustomerService  = SR.GetService('Customer');
    var customer = {};
    customer.name = req.body.name;

    var promise = CustomerService.Create(customer);
    promise.then(function(data) {
    	return res.status(201).json(data);
    })
    .catch(function(err){
    	errorhandler.SendError(req, res);
    });
};


module.exports.update = function (req, res) {
    var CustomerService  = SR.GetService('Customer');
    var promise = CustomerService.Update(req.params.id, req.body);
    promise.then(function(data) {
      	return res.status(200).json(data);
    })
    .catch(function(err){
    	logger.error('CustomerService>>update>>', err);
    	errorhandler.SendError(req, res);
    });
};

module.exports.delete = function (req, res) {
    var CustomerService  = SR.GetService('Customer');
  	var promise = CustomerService.MarkAsDelete(req.params.id);
    promise.then(function(data) {
    	return res.status(200).json('Resource has been deleted');
    })
    .catch(function(err){
    	logger.error('CustomerService>>delete>>', err);
    	errorhandler.SendError(req, res);
    });
};
