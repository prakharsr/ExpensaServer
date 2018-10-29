var mongoose = require('mongoose');
const Schema =  mongoose.Schema;
var User = require('./User');

var FriendSchema = new Schema({
    phone: String,
    name: String,
    amount: { type: Number, default: 0},
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
  },
  {timestamps: true});
  FriendSchema.set('toJSON', { virtuals: true });
  
  module.exports = mongoose.model('Friend', FriendSchema);