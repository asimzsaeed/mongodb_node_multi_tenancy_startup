var mongoose     = require('../../../config/DBInit.js');
 	//mongoose.Promise = require('bluebird'),
  bcrypt = require('bcryptjs'),
  config = require('../../../config/config.json'),
 	Schema = mongoose.Schema,
 	ObjectId 	 = Schema.ObjectId;

//max of 5 attempts, resulting in a 2 hour lock
var SALT_WORK_FACTOR = config.auth.saltWorkFactor || 10,
    MAX_LOGIN_ATTEMPTS = config.auth.maxLoginAttempts || 5,
    LOCK_TIME = config.auth.lockTime || 2 * 60 * 60 * 1000;

var UserSchema   = new Schema({
    username: { type: String, required: true, index: {unique: true}},
    password:{ type: String, require: true },
    account : { type: String,type: ObjectId, ref: 'Account'},
    login_attempts: { type: Number, required: true, default: 0 },
    lock_until: { type: Number },
    verified:{type:Boolean, default: false},
    first_name: { type: String},
    last_name: { type: String},
    title: { type: String},
    avatar: { data: Buffer, contentType: String },
    stats :{
    	created_at : { type: Date},
    	updated_at: { type: Date},
    	created_by : { type: String },
    	updated_by: { type: String },
    	deleted: {type:Boolean, default: false}
    }
});


UserSchema.virtual('isLocked').get(function() {
    return !!(this.lock_until && this.lock_until > Date.now());
});


UserSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });

});

UserSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  	next();
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {

        if (err) return cb(err);
        cb(null, isMatch);
    });
};


UserSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lock_until && this.lock_until < Date.now()) {
        return this.update({
            $set: { login_attempts: 1 },
            $unset: { lock_until: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { login_attempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.login_attempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lock_until: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};

// expose enum on the model
var reasons = UserSchema.statics.failedLogin =  {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};


UserSchema.statics.getAuthenticated = function(username, password, cb) {
     this.findOne({username: username.toLowerCase()}, function(err, user) {
        if (err) return cb(err);

        // make sure the user exists
        if (!user) {
          return cb(null, null, reasons.NOT_FOUND);
        }

        // check if the account is currently locked
        if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }

        // test for a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) 
              return cb(err);
            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                if (!user.login_attempts && !user.lock_until) {
                   //Don't return user object
                   var oUser = {
                      username: user.username
                   }
                    return cb(null, oUser);
                }

                // reset attempts and lock info
                var updates = {
                    $set: { login_attempts: 0 },
                    $unset: { lock_until: 1 }
                };
                return user.update(updates, function(err) {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }

            // password is incorrect, so increment login attempts before responding
            user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });//user.comparePassword
    });//this.findOne
};

mongoose.model('User', UserSchema);
module.exports = mongoose.models.User