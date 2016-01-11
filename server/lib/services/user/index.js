'use strict';
var User    = require('./model.js'),
    Promise = require('bluebird');

function UserService() {

}

module.exports = UserService;


UserService.prototype.GetById = function (id){
    return User
            .findById({_id:id, 'stats.deleted':false },
                { '__v':0, 'stats': 0, 'password': 0, 'login_attempts':0, 'lock_until':0,'account.stats':0, 'account.__v':0, 'account.default_contact': 0})
            .populate('account')
            .exec();
};

UserService.prototype.GetByQuery = function (query){
    if (query) 
        return User.find(query).exec();

    return User.find({'stats.deleted': false},{'__v':0, 'stats.deleted': 0, 'stats.updated_by': 0,}).exec();
};

UserService.prototype.Create = function(username, password) {
    var user = new User();    
    user.username = username.toLowerCase();  
    user.password = password;
    return user.save();
};

UserService.prototype.Update = function (id, model) {
     return User.findOneAndUpdate({_id: id}, {$set: model},{new: true}).exec();
};


UserService.prototype.AssignAccount = function (id, account_id) {
    return User.findOneAndUpdate({_id: id}, {$set: {account: account_id}}).exec();
};

UserService.prototype.MarkAsDelete = function (id) {
    return User.findOneAndUpdate({_id: id}, {$set: {'stats.deleted': true}}).exec();
};


UserService.prototype.ValidateUserName = function (username) {
    return User.findOne({username: username.toLowerCase()}, { '__v':0, 'password': 0, 'stats.deleted': 0, 'stats.updated_by': 0, }).exec();
};


UserService.prototype.AuthenticateUser = function (username, password) {
    return new Promise(function (resolve, reject) {
        User.getAuthenticated(username, password, function(err, user, reason) {
            if (err) reject(err); //throw err;

            if(reason) {
                // otherwise we can determine why we failed
                var reasons = User.failedLogin;
                switch (reason) {
                    case reasons.NOT_FOUND:
                         reject(reasons.NOT_FOUND);
                         break;   
                    case reasons.PASSWORD_INCORRECT:
                         reject(reasons.PASSWORD_INCORRECT);
                         break;
                    case reasons.MAX_ATTEMPTS:
                         reject(reasons.MAX_ATTEMPTS);
                         break;
                }
            }

            // login was successful if we have a user
            if (user) {
                // handle login success
                console.log('login success>>');
                resolve(user)
            }
           
        });
    });
};

 