
exports.GetService  = function (name) {
	console.log('GetService>>', global.ServiceRegestry[name]);
	var Service = global.ServiceRegestry[name];
	var service = new Service;
    return service;
} 

exports.AddService  = function (name, service) {
    global.ServiceRegestry[name] = service
    console.log('AddService>>', global.ServiceRegestry[name], service);
} 
