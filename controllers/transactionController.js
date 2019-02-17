const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addTransaction = (req, res) => {
  res.render('editTransaction', { title: 'Add Transaction' });
};

exports.createTransaction = async (req, res) => {
  const transaction = await (new Transaction(req.body)).save();
  req.flash('success', `Successfully added "${transaction.info}"`);
  res.redirect('/');
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.group(); // get data
  res.render('transactions', { title: 'Transactions', transactions }); // pass data to template
};

exports.editTransaction = async (req, res) => {
  // find the store given the id
  const transaction = await Transaction.findOne({ _id: req.params.id });
  // then render out the edit form
  res.render('editTransaction', { title: 'Edit', transaction})
};