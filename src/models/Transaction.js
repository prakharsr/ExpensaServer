var mongoose = require('mongoose');
const Schema =  mongoose.Schema;

var TransactionSchema = new Schema({
    amount: { type: Number},
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    friend : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Friend",
        required:true
    },
    date: Date,
    remark: String,
  },
  {timestamps: true});
  TransactionSchema.set('toJSON', { virtuals: true });
  
  module.exports = mongoose.model('Transaction', TransactionSchema);