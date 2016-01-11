'use strict';

function CustomerService(APIService) {
	 
	return {
	 	GetCustomers: GetCustomers
    }

    function GetCustomers(){
    	return APIService.get('customer');
	};
    
};


CustomerService.$inject = ['APIService'];
module.exports = CustomerService;

