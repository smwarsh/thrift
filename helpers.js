/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
// I am attempting to change the moment dependency to the date-fns library -SW
exports.dateFns = require('date-fns');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
exports.siteName = `Thrift Spending Tracker`;

exports.menu = [
  { slug: '/transactions', title: 'Transactions', icon: 'store', },
  { slug: '/tags', title: 'Tags', icon: 'tag', },
  { slug: '/top', title: 'Top', icon: 'top', },
  { slug: '/add', title: 'Add', icon: 'add', },
  { slug: '/map', title: 'Map', icon: 'map', },
];

exports.display = {
  getCategories: trans => trans.map( object => object._id.category ),
  
  getTransactions: (trans, category) =>
    trans.find(object => object._id.category === category).transactions,
  
  displayAsDate: date => h.dateFns.format(date, 'ddd MMM D[,] YYYY'),
  
  toPrice(value) {
    value /= 100;
    return '$' + parseFloat(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
  },

  // I haven't tested this function yet, but
  // this is my preliminary idea for cleaning
  // up the category names
  fixCategoryName(category) {
    let categoryArray = category.split("");
    let sliceLength = 0;
    if(category.startsWith("Expense")) {
      sliceLength = 10;
    } else if(category.startsWith("Income")) {
      sliceLength = 9;
    }
    return (categoryArray.slice(sliceLength)).join("");
  }
};
