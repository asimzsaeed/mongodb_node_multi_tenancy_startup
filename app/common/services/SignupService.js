'use strict';

function SignupService(RESTService, $location, AuthenticationFactory) {
	 
	return {
	 	CheckUsername: CheckUsername,
	 	SuggestUrls: SuggestUrls,
	 	Signup: Signup,
	 	DomainVerify : DomainVerify,
	 	Login: Login,
	 	Logout: Logout
    }

    function CheckUsername(email){
    	return RESTService.get('checkUsername/' + email);
	};
    
    function SuggestUrls(domain){
    	return RESTService.get('SuggestUrls/' + domain);
	};

	function Signup(user){
    	return RESTService.post('signup', user);
	};

	function DomainVerify(domain){
    	return RESTService.post('verifyDomain',  domain);
	};

	function Login(user){
    	return RESTService.post('Login', user);
	};

	function Logout(){
    	if (AuthenticationFactory.isLogged) {
    		AuthenticationFactory.isLogged = false;
	        delete AuthenticationFactory.user;
	        delete AuthenticationFactory.userRole;
	 
	        delete $window.sessionStorage.token;
	        delete $window.sessionStorage.user;
	        delete $window.sessionStorage.userRole;
    		$location.path("/login");
    	}
	};
};


SignupService.$inject = ['RESTService', '$location', 'AuthenticationFactory'];
module.exports = SignupService;

