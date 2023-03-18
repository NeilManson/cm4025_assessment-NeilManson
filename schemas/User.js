const mongoose = require('mongoose');
const bcrypt = require('bcrypt'), SALT_WORK_FACTOR=10;

const UserSchema = new mongoose.Schema({
    email:{type:String, unique:true, match:[/.+\@.+\..+/, 'Please fill a valid email address']},
    password:{type:String},
    firstname:String,
    lastname:String,
    isAdmin:{type:Boolean, default:false},
});

// from http://stackoverflow.com/questions/14588032/mongoose-password-hashing
UserSchema.pre('save', function (next) {
    var user = this;

    //only hash the password if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        //hash the password using our salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            //override the cleartext password with the hashed one
            user.password = hashnext()
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch){
        if (err) return callback(err);
        callback(undefined, isMatch);
    });
};

const User = mongoose.model('User', UserSchema)
module.exports = User