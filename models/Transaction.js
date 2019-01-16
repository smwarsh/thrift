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
  }
});

// Getter
transactionSchema.path('price').get((num) => {
  console.log("Getter reached");
  (num / 100).toFixed(2);
})

// Setter
transactionSchema.path('price').set((num) => {
  console.log("Setter reached");
  num * 100;
})

module.exports = mongoose.model('Transaction', transactionSchema);