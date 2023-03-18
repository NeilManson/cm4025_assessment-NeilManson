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
UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

  UserSchema.methods.validatePassword = function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };

const User = mongoose.model('User', UserSchema)
module.exports = User