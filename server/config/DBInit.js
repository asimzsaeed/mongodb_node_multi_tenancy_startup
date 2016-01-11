// connection.js

var mongoose = require('mongoose'),
	config = require('./config.json');

mongoose.Promise = require('bluebird');

//mongoose.connect(config.dbs.vizob_com_crm);
var db = mongoose.createConnection(config.dbs.vizob_com_crm);
db.Schema = mongoose.Schema;
//var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error>> : '));
db.once('open', function(){
  console.log('MongoDB Connection ok!');
});

module.exports = db;


