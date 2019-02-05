document.write('Hey');

function getTransactions(transactions, category) {
  const correctCategory = transactions.find( object =>
    object._id.category === category
  );
  return correctCategory.transactions;
}