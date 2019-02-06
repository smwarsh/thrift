document.write('Hey');

function getCategories(transactions) {
  return transactions.map( object => object._id.category );
}

function getTransactions(transactions, category) {
  const correctCategory = transactions.find( object =>
    object._id.category === category
  );
  return correctCategory.transactions;
}

function displayAsDate(date) {
  h.dateFns.format(date, 'ddd MMM D[,] YYYY');
}

function toPrice(value) {
  value /= 100;
  return '$' + parseFloat(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
}