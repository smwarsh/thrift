document.write('Hey');

function getCategories(transactionsArray) {
  return transactionsArray.map( object => {
    object._id.category
  });
}