const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

exports.homePage = (req, res) => {
  res.render('index');
}

exports.addTransaction = (req, res) => {
  res.render('editTransaction', { title: 'Add Transaction' })
}

exports.createTransaction = async (req, res) => {
  const transaction = await (new Transaction(req.body)).save();
  req.flash('success', `Successfully added "${transaction.info}"`);
  res.redirect('/');
}