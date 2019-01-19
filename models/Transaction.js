const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs'); // I don't think I need this for Thrift

function toInteger(p) {
  return Math.round((p * 100));
}

function toPrice(value) {
  // return (value / 100).toFixed(2);
  value /= 100;
  return parseFloat(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
  // I'll be able to test this soon, when I find the db entry
  // to edit the entry, later in Module 4
}

const transactionSchema = new mongoose.Schema({
  group: {
    type: String,
    required: 'Please select Expense or Income'
  },
  category: {
    type: String,
    required: 'Please choose a category'
  },
  info: {
    type: String,
    trim: true,
    required: 'Please enter a description of this transaction'
  },
  price: {
    type: Number,
    required: 'Please enter a price for this transaction',
    set: toInteger,
    get: toPrice
  },
  date: {
    type: Date,
    required: 'Please choose a date for this transaction'
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);