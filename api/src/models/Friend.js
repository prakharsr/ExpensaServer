var mongoose = require('mongoose');
const Schema =  mongoose.Schema;

var FriendSchema = new Schema({
      name: { type: String, required: true },
      amount: { type: Number, default: 0 },
  });
  FriendSchema.set('toJSON', { virtuals: true });
  
  module.exports = mongoose.model('Friend', FriendSchema);