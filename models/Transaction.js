const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs'); // I don't think I need this for Thrift

function toInteger(p) {
  return Math.round((p * 100));
}

// adapted some of this from http://www.jacklmoore.com/notes/rounding-in-javascript/
function toPrice(value) {
  value /= 100;
  return parseFloat(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
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
    required: 'Please choose a date for this transaction',
  }
});

transactionSchema.statics.group = function() {
  return this.aggregate([
    { 
      $group: 
      {
        _id: { group: '$group', category: '$category' },
        transactions: { $push: {
          info: '$info',
          price: '$price',
          date: '$date',
          _id: '$_id'
        }}
      }
    },
    {
      // $sort: { '_id.category': 1, '_id.group': 1 }
      $sort: { '_id.group': 1, '_id.category': 1 }
    }
  ]);
}

module.exports = mongoose.model('Transaction', transactionSchema);