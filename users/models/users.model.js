
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   permissionLevel: Number
});

const userModel = mongoose.model('Users', userSchema);
