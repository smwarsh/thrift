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

exports.updateTransaction = async (req, res) => {
  // find and update the store
  const transaction = await Transaction.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new transaction instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${transaction.info}</strong>`);
  res.redirect('/transactions');
}