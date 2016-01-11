'use strict';

function LoginDefaultCtrl($scope, $log, SignupService) {
    var vm = this;
    vm.message;
	vm.DomainVerify = DomainVerify;

    function DomainVerify(domain) {
    	$log.info('LoginDefaultCtrl>>DomainVerify>>',domain);

    	SignupService.DomainVerify({domain:domain})
    	 .then(function(res) {
    	 	$log.info('LoginDefaultCtrl>>res>>',res);
    	 	if(res.data.status === 'err') {
    	 		vm.message = 'We cannot find ' + domain + '.vizob.com';
    	 	} else {
    	 		window.location.href = 'http://' + domain + '.vizob.com/login';
    	 	}
		})
		.catch(function(err){
			$log.error('LoginDefaultCtrl>>DomainVerify>>', err);
		}); 
    }
}

LoginDefaultCtrl.$inject = ['$scope', '$log','SignupService'];
module.exports = LoginDefaultCtrl;