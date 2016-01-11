var mongoose     = require('../../../config/DBInit.js');
//mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AccountSchema   = new Schema({
    name: {type:String, required: true},
    domain: { type: String, required: true, index: {unique: true}},
    default_contact : { type: String,type: ObjectId, ref: 'User', required: true},
    stats :{
    	created_at : { type: Date},
    	updated_at: { type: Date},
    	created_by : { type: String },
    	updated_by: { type: String },
    	deleted: {type:Boolean, default: false}
    }
});


AccountSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  	next();
});

mongoose.model('Account', AccountSchema);
module.exports = mongoose.models.Account

