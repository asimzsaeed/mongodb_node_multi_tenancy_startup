'use strict';

function CreateCtrl($scope, $log, SignupService) {
    var vm = this;
    vm.user = {};
    vm.steps = ['email', 'company', 'domain', 'password'];
    vm.current_step = 'email';

    vm.EmailVerify = EmailVerify;
    vm.SuggestUrls = SuggestUrls;
    vm.Signup = Signup;

    Init();

    function Init() {
	 	$log.info('CreateCtrl>>Init>>');
    }

    function EmailVerify(email) {
    	vm.current_step_message = null;
    	SignupService.CheckUsername(email)
    	 .then(function(res) {
		  	$log.info('CreateCtrl>>EmailVerify>>',res);
		  	if(res.data.message === 'taken') {
		  		vm.current_step_message = 'Email address ' + email + ' has been taken';
		  	} else {
		  		vm.current_step = 'company';
		  	}
		})
		.catch(function(err){
			$log.error('CreateCtrl>>EmailVerify>>', err);
		}); 
    }
    
    function SuggestUrls(company) {
		vm.current_step_message = null;
		vm.user.domain = company;
    	 SignupService.SuggestUrls(company.replace(/ /g,''))
	    	 .then(function(res) {
			  	$log.info('CreateCtrl>>SuggestUrls>>', res);
			  	if(res.data.message === 'taken') {
			  		vm.current_step_message = 'We tried the following URLs, but they were unavailable:';
			  		vm.urls_checked = res.data.urls_checked;
			  		var urls_availables = _.find(vm.urls_checked, function(url) {
											  return url.status === 'available';
											});
			  		$log.info('CreateCtrl>>SuggestUrls>>urls_availables', urls_availables);
			  		if(urls_availables)
			  			vm.user.domain = urls_availables.url;
			  	} 

			  	if(vm.current_step === 'company')
			  			vm.current_step = 'domain';
			  	else if (vm.current_step === 'domain')
			  			vm.current_step = 'review';
			  	
			})
			.catch(function(err){
				$log.error('CreateCtrl>>SuggestUrlswe>>', err);
			}); 
    
    }


    function Signup (user) {
	 	$log.info('CreateCtrl>>Signup>>', user);
	 	SignupService.Signup(user)
	    	 .then(function(res) {
			  	$log.info('CreateCtrl>>SuggestUrls>>', res);
			  	if(res.data.message === 'taken') {
			  		vm.current_step_message = 'We tried the following URLs, but they were unavailable:';
			  		vm.urls_checked = res.data.urls_checked;
			  		var urls_availables = _.find(vm.urls_checked, function(url) {
											  return url.status === 'available';
											});
			  		$log.info('CreateCtrl>>SuggestUrls>>urls_availables', urls_availables);
			  		if(urls_availables)
			  			vm.user.domain = urls_availables.url;
			  	}

			  	if(vm.current_step === 'company')
			  		vm.current_step = 'domain';
			  	else if (vm.current_step === 'domain')
			  		vm.current_step = 'review';
			  	
			})
			.catch(function(err){
				$log.error('CreateCtrl>>SuggestUrlswe>>', err);
			}); 
	 	
    }

}

CreateCtrl.$inject = ['$scope', '$log','SignupService'];
module.exports = CreateCtrl;