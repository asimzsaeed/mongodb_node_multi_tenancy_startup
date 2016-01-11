'use strict';
function CustomerCtrl($scope,$log, CustomerService) {
    var vm = this;
    vm.title = 'this is customer'


	Init();
    function Init () {
		 CustomerService.GetCustomers()
	    	 .then(function(res) {
			  	vm.customer = res.data;
			  	$log.info('CustomerCtrl>>CustomerService.GetCustomers>>',vm.customer);
			})
			.catch(function(err){
				$log.error('GetCustomers>>', err);
			}); 
    }
}
 
CustomerCtrl.$inject = ['$scope','$log', 'CustomerService'];
module.exports = CustomerCtrl;