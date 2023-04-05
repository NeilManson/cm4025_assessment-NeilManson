const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


// Create User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'], required: "Email is required" },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, }
});

// Hash password
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User-prod', UserSchema);