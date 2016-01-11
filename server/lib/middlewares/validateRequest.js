'use strict';
//http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
var jwt = require('jsonwebtoken'),
    config = require('../../config/config.json'),
    errorhandler = require('../../lib/middlewares/errorhandler'),
    userService = require('../services/user'),
    UserService = new userService(),

    accountService = require('../services/account'),
    AccountService = new accountService(),
    logger  = require('../../config/logger');

 

module.exports = function(req, res, next) {

  // We skip the token outh for [OPTIONS] requests.
  if(req.method == 'OPTIONS') next();

  var bearerHeader = req.headers["authorization"];
   if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" "),
        bearerToken = bearer[1];
    try {
      var decoded = jwt.verify(bearerToken, config.auth.secret);
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({ 'status': 400, 'message': 'Token Expired'});
        return;
      }

      if(typeof req.subdomains[0] === 'undefined'){
        res.status(401);
        res.json({ 'status': 401, 'message': config.message.invalidCredentials});
        return;
      }


      var promise = UserService.ValidateUserName(decoded.username);
      promise.then(function(user) {
        if (!user) { // If authentication fails, we send a 401 back
          res.status(401);
          res.json({"status": 401, "message": config.message.invalidCredentials });
        } else {
          req.user = user; //add user to request
          return AccountService.HasUserAndDomainValid(req.subdomains[0] , user);
        }
      }).then(function(isValid) {
         if (isValid) {
           next();

        } else {
          // No user with this name exists, respond back with a 401
          delete req.user;
          res.status(401);
          res.json({ 'status': 401, 'message': config.message.invalidCredentials});
        }
      }) 
      .catch(function(err){
          errorhandler.SendError(req, res);
      });
    } catch (err) {
      errorhandler.SendError(req, res);
    }
  } else {
    res.status(401);
    res.json({'status': 401, 'message': config.message.invalidCredentials});
  }
};
