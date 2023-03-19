const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

// Create User Schema
const UserSchema = new mongoose.Schema({
    username:String,
    password:String
})

// Hash password
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)