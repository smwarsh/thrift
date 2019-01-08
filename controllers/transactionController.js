const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

exports.homePage = (req, res) => {
  res.render('index');
}

exports.addTransaction = (req, res) => {
  res.render('editTransaction', { title: 'Add Transaction' })
}

exports.createTransaction = async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.redirect('/');
}