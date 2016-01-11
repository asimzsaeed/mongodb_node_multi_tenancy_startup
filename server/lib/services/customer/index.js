'use strict';
//var Customer; 

function CustomerService(model_ctx) {
	//Customer = model_ctx;
}

module.exports = CustomerService;

CustomerService.prototype.Customer

CustomerService.prototype.GetById = function (id){
    return Customer.findById({_id:id, 'stats.deleted':false },{ '__v':0, 'stats.deleted': 0, 'stats.updated_by': 0, }).exec();
};

CustomerService.prototype.GetByQuery = function (query){
    if (query) 
        return Customer.find(query).exec();

    return Customer.find({'stats.deleted': false},{'__v':0, 'stats.deleted': 0, 'stats.updated_by': 0,}).exec();
};

CustomerService.prototype.Create = function(model) {
    var customer = new this.Customer();//global.ActiveClientMongooseConnection.models['Customer'];    
        customer.name = model.name;  
    return customer.save();
};

CustomerService.prototype.Update = function (id, model) {
     return Customer.findOneAndUpdate({_id: id}, {$set: model},{new: true}).exec();
};

CustomerService.prototype.MarkAsDelete = function (id) {
	 return Customer.findOneAndUpdate({_id: id}, {$set: {'stats.deleted': true}}).exec();
};

