const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


// Create User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'], required: "Email is required" },
    isAdmin: { type: Boolean, default: false },
});

const passwordValidation = function(password, cb) {
    const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    if(!regex.test(password)){
        return cb("the password does not meet the criteria. Please return to registration page and try a stronger password")
    }else{
        return cb()
    }
}

// Hash password
UserSchema.plugin(passportLocalMongoose,{passwordValidator:passwordValidation});

module.exports = mongoose.model('User-prod', UserSchema);