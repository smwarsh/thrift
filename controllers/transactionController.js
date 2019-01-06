exports.homePage = (req, res) => {
  res.render('index');
}

exports.addTransaction = (req, res) => {
  res.render('editTransaction', { title: 'Add Transaction' })
}

exports.createTransaction = (req, res) => {
  console.log(req.body);
  res.json(req.body);
}