'use strict';
var config = require('../../config/config.json'),
    accountService = require('../services/account'),
    AccountService = new accountService(),
    logger  = require('../../config/logger');
    

module.exports = function(req, callback){
  	var corsOptions = { origin: false };
    switch (req.subdomains[0]) {
        case undefined:
            callback(null, { origin: false }); 
            break;
        case 'www':
        case 'admin':
            callback(null, { origin: true }); 
            break;
        default:
           validateSubDomain(req.subdomains[0], callback);
    }
   
  	 
};


function validateSubDomain(subdomain, callback) {

    var promise = AccountService.ValidateDomain(subdomain);
    promise.then(function(domainExists) {
        if(domainExists) {
            callback(null, { origin: true }); 
        } else {
            callback(null, { origin: false }); 
        }
      })
    .catch(function(err){
        callback(null, { origin: false }); 
    });
    
}

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

function getDomain(url) {
    var hostName = getHostName(url);
    var domain = hostName;
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    
    return domain;
}
