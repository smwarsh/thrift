const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs'); // I don't think I need this for Thrift

function toInteger(p) {
  return parseInt((p * 100));
}

function toPrice(value) {
  return (value / 100).toFixed(2);
  // value /= 100;
  // Number(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2)
  // I'll be able to test this soon, when I find the db entry
  // to edit the entry, later in Module 4
}

const transactionSchema = new mongoose.Schema({
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