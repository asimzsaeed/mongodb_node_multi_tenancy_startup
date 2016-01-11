// /http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
'use strict';
var express = require('express'),
	url = require('url'),
  cors = require('cors'),
	proxy = require('proxy-middleware'),
	bodyParser = require('body-parser'),
  multer = require('multer'),
  morgan = require('morgan'),
  config = require('./config/config.json'),
  session = require('express-session'),
  expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'),
  path = require('path');

var server = express();



var corsOptions = {
  origin: '*'
};


server.set('port', (process.env.PORT || 80));




//server.use(cors(corsOptionsDelegate));
server.use(morgan(config.logging.type));
server.use(express.static('./../dist'));
server.use(bodyParser.json()); // for parsing application/json
//server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//server.use(multer()); // for parsing multipart/form-data

//NOTE: At the moment sometime we get followign error:
//(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
// It's due to we are using alots of listeners e.g. server.all('/*', cors());, server.all('/*', cors(require('./lib/middlewares/validateDomain')));
// We need to merge somge of those listners into one listner
// Suggetion : merge all '/api/*' into One, cors into validateDomain 

server.options('*', cors()); 
server.all('/*', cors());


//Validate subdomain for all request
server.all('/*', cors(require('./lib/middlewares/validateDomain')));

//Authentication
server.use(require('./auth'));// auth routes

// Initialize Client DB
server.all('/api/*', require('./lib/middlewares/initializeClientDB'));


// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
server.all('/api/*', [require('./lib/middlewares/validateRequest')]);



//Initilize API's
var api = require('./lib/api');
api.initialize(server);

server.all('/*', function(req, res, next) {
    var fallbackPage = '/loader.html';
    console.log('req.user>.', req.user);
    if(req.user)
        fallbackPage = '/loader.html';

    var rootPath = path.join(__dirname, './../dist/');
    res.sendFile('/', { 
        root: rootPath,
        fallback :  rootPath  + fallbackPage //'/index.html'
      });
});


// If no route is matched by now, it must be a 404
/*server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
/*server.listen(server.get('port'), function() {
  console.log("Node app is running at localhost:" + server.get('port'));
});*/
  
server.listen(server.get('port'), '0.0.0.0');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

