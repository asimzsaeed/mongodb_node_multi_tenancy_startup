'use strict';
var Account     = require('./model.js');

function AccountService() {

}

module.exports = AccountService;

AccountService.prototype.GetById = function (id){
    return Account.findById({_id:id, 'stats.deleted':false },{ '__v':0, 'stats.deleted': 0, 'stats.updated_by': 0, }).exec();
};

AccountService.prototype.GetByQuery = function (query){
    if (query) 
        return Account.find(query).exec();
    return Account.find({'stats.deleted': false},{'__v':0, 'stats.deleted': 0, 'stats.updated_by': 0,}).exec();
};

AccountService.prototype.Create = function(model) {
	var account = new Account(model); 
    return account.save(account);
};

AccountService.prototype.Update = function (id, model) {
     return Account.findOneAndUpdate({_id: id}, {$set: model},{new: true}).exec();
};

AccountService.prototype.MarkAsDelete = function (id) {
	 return Account.findOneAndUpdate({_id: id}, {$set: {'stats.deleted': true}}).exec();
};

AccountService.prototype.ValidateDomain = function (domain){
    return Account.findOne({domain: domain.toLowerCase()}, { '__v':0, 'stats.deleted': 0, 'stats.updated_by': 0, }).exec();
};



AccountService.prototype.HasUserAndDomainValid = function (domain,user){
	return new Promise(function (resolve, reject) {
		Account.findOne({domain: domain.toLowerCase()}, 'name, domain', function (err, account) {
		   if (err) reject(err);
		   if(account && account._id.toString() === user.account.toString()) {
			   resolve(true)   
		   } else {
		   	  resolve(false);
		   }
		});
	});
     
};