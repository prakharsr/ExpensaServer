var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema =  mongoose.Schema;

var UserSchema = new Schema({
    phone: {
          type: String,
          unique: true,
          required: true
      },
      password: { type: String, required: true },
      firstName: { type: String, /*required: true */},
      lastName: { type: String, /*required: true*/ },
      name: { type: String, /*required: true*/ },
  },
  {timestamps: true});
  UserSchema.set('toJSON', { virtuals: true });
  
  module.exports = mongoose.model('User', UserSchema);