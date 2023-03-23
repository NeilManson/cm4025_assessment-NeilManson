const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

// Create User Schema
const UserSchema = new mongoose.Schema({
    username:{type:String, unique:true, match:[/.+\@.+\..+/, 'Please fill a valid email address']},
    isAdmin:{type:Boolean, default:false},
    password:String
})

// Hash password
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);