var mongoose = require('../../app/models/mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schema({
  username: {type: String, index: {unique: true}},
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  key: String,
<<<<<<< HEAD
  confirmed: String,
  permissions: String
=======
  confirmed: String
>>>>>>> Add account verification for users
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
