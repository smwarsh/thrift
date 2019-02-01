const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addTransaction = (req, res) => {
  // res.render('editTransaction', { title: 'Add Transaction' });
  
};

exports.createTransaction = async (req, res) => {
  const transaction = await (new Transaction(req.body)).save();
  req.flash('success', `Successfully added "${transaction.info}"`);
  res.redirect('/');
};

exports.getTransactions = async (req, res) => {
  // 1. Query the database for a list of all transactions
  // const transactions = await Transaction.find({"category": "Expense - Trips"});
  const transactions = await Transaction.group();
  res.render('transactions', { title: 'Transactions', transactions });
  // res.json(transactions[0].transactions[0]);
  // res.json(transactions[0]._id.category);
};