 'use strict';
var Promise = require('bluebird'),
  	errorhandler = require('../lib/middlewares/errorhandler'),
   	userService = require('../lib/services/user'),
    UserService = new userService(),
    DomainSetup = require('../config/setupDomain'),
    accountService = require('../lib/services/account'),
    AccountService = new accountService(),
    jwt = require('jsonwebtoken'),
 	  config = require('../config/config.json'),
    helper = require('../config/helper'),
 	  logger  = require('../config/logger');


module.exports.login = function (req, res) {
	var username = req.body.username || '';
  var password = req.body.password || '';
  console.log('login>>', username, password, req.headers.origin);
  var user_account_id; 
  if (username == '' || password == '') {
    res.status(401);
    res.json({ "status": 401, "message": config.message.invalidCredentials });
    return;
  }
 	
  if(typeof req.subdomains[0] === 'undefined'){
    res.status(401);
    res.json({ 'status': 401, 'message': config.message.invalidCredentials});
    return;
  }


 	  //Check if the user exits
  var promise = UserService.ValidateUserName(username);
  promise.then(function(user) {
    if (!user) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({"status": 401, "message": config.message.invalidCredentials });
      return;
    }
    
    if (user) {
      //validate user belone to subDomain
      if(req.subdomains) {
         return AccountService.HasUserAndDomainValid(req.subdomains[0], user);
      }
      return false;
    }
  })
  .then(function(isValid) {
    if (!isValid) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({"status": 401, "message": config.message.invalidCredentials });
      return;
    }

    //authenticate user 
    if (isValid) {
      return UserService.AuthenticateUser(username, password);
    }
  })
  .then(function(user) {
    if (!user) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({"status": 401, "message": config.message.invalidCredentials });
      return;
    }
    if (user) {
      // If authentication is success, we will generate a token  and dispatch it to the client
      res.user = user;
      res.ClientKey = user.account;
      res.json(genToken(user));
    }
  })
  .catch(function(err){
    if(err === 0 || err === 1){
      res.status(401);
      res.json({"status": 401, "message": config.message.invalidCredentials });
      return;
    } 
    else if(err === 2){
      res.status(401);
      res.json({"status": 401, "message": config.message.accountLock });
      return;
    }
    
  });
};

// private method
function genToken(user) {
  
  var token = jwt.sign(user, config.auth.secret, {maxAge: config.auth.tokenExpiresIn});
 
  return {
    token: token,
    user: user
  };
}
 


module.exports.signup = function (req, res) {
	var username = req.body.username.toLowerCase() || '';
  var password = req.body.password || '';
  var company = req.body.company || '';
  var domain = req.body.domain.toLowerCase() || '';
  console.log(req.body);
  if (username == '' || password == '' || company == '' || domain == '') {
    	res.status(401);
    	res.json({ "status": 401, "message": config.message.invalidCredentials});
    	return;
  }


  //Check domain name availability
	var promise = AccountService.ValidateDomain(domain);
  promise.then(function(domainTaken) {
    if(domainTaken) {
      res.status(500).json('domain name ' + domain + ' has been taken.');
      return
    }
    // validate user name
    return UserService.ValidateUserName(username);
  })
  .then(function(usernameTaken) {
    if(usernameTaken) {
      res.status(500).json('username ' + username + ' has been taken.');
      return
    }

    //create a new user
    return UserService.Create(username, password);
  })
  .then(function(user) {
     var account = {
      name: company,
      domain: domain,
      default_contact : user._id
    }
    //Create account for user
    return AccountService.Create(account); 
  })
  .then(function(account) {
    //now lets assign account to user: default_contact is user
    return UserService.AssignAccount(account.default_contact, account.id); 
  })
  .then(function(user) {
    //New populate new user with account details
    return UserService.GetById(user._id);
  })
  .then(function(user) {
    return res.status(200).json(user);
  })
  .catch(function(err){
    logger.error('AuthService>>register>>', err);
    errorhandler.SendError(req, res);
  });

};


module.exports.checkURL = function (req, res) {
  var domain = req.params.domain || '';
  if (domain == '') {
      res.status(422);
      res.json({ "status": 422, "message": config.message.unprocessableRequest});
      return;
  }

  //Check domain name availability
  var promise = AccountService.ValidateDomain(domain);
  promise.then(function(domainTaken) {
    if(domainTaken) {
      res.status(200).json({status: 'err', message:"taken"});
      return
    } else {
      res.status(200).json({status: 'ok', message:"available", timestamp: new Date().getTime()});
      return
    }
   })
  .catch(function(err){
    logger.error('AuthService>>checkURL>>', err);
    errorhandler.SendError(req, res);
  });
};

module.exports.checkUsername = function (req, res) {
  var username = req.params.username   || '';
  if (username == '') {
      res.status(422);
      res.json({ "status": 422, "message": config.message.unprocessableRequest });
      return;
  }

  //Check username name availability
  var promise = UserService.ValidateUserName(username);
  promise.then(function(usernameTaken) {
    if(usernameTaken) {
      res.status(200).json({status: 'err', message:"taken"});
      return
    } else {
      res.status(200).json({status: 'ok', message:"available", timestamp: new Date().getTime()});
      return
    }
   })
  .catch(function(err){
    logger.error('UserService>>checkUsername>>', err);
    errorhandler.SendError(req, res);
  });
};

module.exports.SuggestUrls = function (req, res) {
  var urls_checked = [];
  var checkURL_JSON = {};
  var domain = req.params.domain || '';
  var domaincrm = domain + 'crm';
  var domain_crm = domain + '_crm';
  var url_available = false;
  if (domain == '') {
      res.status(422);
      res.json({ "status": 422, "message": config.message.unprocessableRequest });
      return;
  }

  //Check domain name availability
  var promise = AccountService.ValidateDomain(domain);
  promise.then(function(domainTaken) {
    if(domainTaken) {
      checkURL_JSON.status= 'err';
      checkURL_JSON.message= 'taken';
      urls_checked.push({url:domain, status: 'taken'});
      //We need to try few more urls
      return AccountService.ValidateDomain(domaincrm);
    } else {
      url_available = true;
      res.status(200).json({status: 'ok', message:"available", timestamp: new Date().getTime()});
      res.end() 
    }
   })
  .then(function(domainTaken) {
    if(domainTaken) {
      urls_checked.push({url:domaincrm, status: 'taken'});
    } else {
      urls_checked.push({url:domaincrm, status: 'available'});
    }
     return AccountService.ValidateDomain(domain_crm);
   })
  .then(function(domainTaken) {
   if(domainTaken) {
      urls_checked.push({url:domain_crm, status: 'taken'});
    } else {
      urls_checked.push({url:domain_crm, status: 'available'});
    }
    checkURL_JSON.urls_checked = urls_checked;
    if(!url_available)
      res.status(200).json(checkURL_JSON);
   })
  .catch(function(err){
    logger.error('AuthService>>checkURL>>', err);
    errorhandler.SendError(req, res);
  });
};

module.exports.verifyDomain = function (req, res) {
  var domain = req.body.domain || '';
  if (domain == '') {
      res.status(422);
      res.json({ "status": 422, "message": config.message.unprocessableRequest });
      return;
  }
  var promise = AccountService.ValidateDomain(domain);
  promise.then(function(validDomain) {
    if(validDomain) {
      res.status(200).json({status: 'ok', message:"valid"});
      return
    } else {
      res.status(200).json({status: 'err', message:"invalid", timestamp: new Date().getTime()});
      return
    }
   })
  .catch(function(err){
    logger.error('AuthService>>verifyDomain>>', err);
    errorhandler.SendError(req, res);
  });
};
