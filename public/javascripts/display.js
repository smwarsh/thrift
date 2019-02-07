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

// I haven't tested this function yet, but
// this is my preliminary idea for cleaning
// up the category names
function fixCategoryName(category) {
  let categoryArray = category.split("");
  let sliceLength = 0;
  if(category.startsWith("Expense")) {
    sliceLength = 10;
  } else if(category.startsWith("Income")) {
    sliceLength = 9;
  }
  return (categoryArray.slice(sliceLength)).join("");
}