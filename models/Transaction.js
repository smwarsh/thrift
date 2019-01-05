const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs'); // I don't think I need this for Thrift

const transactionSchema = new mongoose.Schema({
  info: {
    type: String,
    trim: true,
    required: 'Please enter a description of this transaction'
  },
  price: {
    type: Number,
    required: 'Please enter a price for this transaction'
  },
  date: {
    type: Date,
    required: 'Please choose a date for this transaction'
  },
  id: Number
});

transactionSchema.pre('save', function(next) {
  // this.id = 
  // Here is where I will auto increment the id or do something like that
  next();
})

module.exports = mongoose.model('Transaction', transactionSchema);