var mongoose  = require('mongoose'); 
var Schema       = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CustomerSchema   = new Schema({
    name: String,
    stats :{
    	created_at : { type: Date},
    	updated_at: { type: Date},
    	
    	created_by : { type: String },
    	updated_by: { type: String },
    	deleted: {type:Boolean, default: false}
    }
});


CustomerSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  	next();
});

//mongoose.model('Customer', CustomerSchema);
module.exports = CustomerSchema;//mongoose.models.Customer