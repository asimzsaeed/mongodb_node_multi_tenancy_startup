//for nginx we might need this setup
var exec = require('child_process').exec,
    path = require('path'),
    os   = require('os');
    fs   = require('fs').
    dir	 = __dirname,
    scriptFile = 'setup_domain.bat';

// HACK: to make our calls to exec() testable,
// support using a mock shell instead of a real shell
var shell = process.env.SHELL || 'sh';

// support for Win32 outside Cygwin
if (os.platform() === 'win32' && process.env.SHELL === undefined) { 
  shell = process.env.COMSPEC || 'cmd.exe';
}

// Merges the current environment variables and custom params for the environment used by child_process.exec()
function createEnv(params) {
    var env = {};
    var item;

    for (item in process.env) {
        env[item] = process.env[item];
    }

    for(item in params) {
        env[item] = params[item];
    }

    return env;
}

// scriptFile must be a full path to a shell script
exports.SetupDomain = function (domain_name, callback) {
	console.log('SetupDomain>>1');
	var cp = require('child_process');
	//msg = cp.exec(scriptFile +" " + domain_name ,function (error, stdout, stderr) {
	msg = cp.execFile(scriptFile ,[domain_name] ,{cwd:__dirname},function (error, stdout, stderr) {
	    if (error) {
	        console.log(error.stack);
	        console.log('Error code: '+error.code);
	        console.log('Signal received: '+error.signal);
	    }
	    console.log('Child Process STDOUT: '+stdout);
	    console.log('Child Process STDERR: '+stderr);
	});

   /* var cmd;

    

    if (!domain_name) {
    	console.log('SetupDomain>>2');
        callback(new Error('domain_name cannot be null'), null, null);
    }

    if (!fs.existsSync(dir)) {
    	console.log('SetupDomain>>3');
        callback(new Error('dir path not found - "' + dir + '"'), null, null);
    }

    if (scriptFile === null) {
    	console.log('SetupDomain>>4');
        callback(new Error('scriptFile cannot be null'), null, null);
    }

    if (!fs.existsSync(scriptFile)) {
    	console.log('SetupDomain>>5');
        callback(new Error('scriptFile file not found - "' + scriptFile + '"'), null, null);
    }

    // transform windows backslashes to forward slashes for use in cygwin on windows
    if (path.sep === '\\') {
    	console.log('SetupDomain>>6');
        scriptFile = scriptFile.replace(/\\/g, '/');
    }*/

    console.log('SetupDomain>>7');
    // TODO: consider building the command line using a shell with the -c argument to run a command and exit
    cmd = '"' + shell + '" "' + scriptFile + '"';
    console.log('SetupDomain>>8');
    // execute script within given project workspace
    exec(cmd, {  cwd: dir },
        function (error, stdout, stderr) {
            // TODO any optional processing before invoking the callback
            console.log('exports.SetupDomain>>',error, stdout, stderr);
            callback(error, stdout, stderr);
        }
    );
};