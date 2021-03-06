/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built-in module to Node that lets us read files from the system we're running on
const fs = require('fs');
const dateFns = require('date-fns');

// date-fns is a library for displaying dates. It is needed in the templates to display things like "Posted 5 minutes ago"
// Changed to date-fns from the moment dependency in the starter files
exports.dateFns = dateFns;

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
  // { slug: '/tags', title: 'Tags', icon: 'tag', },
  // { slug: '/top', title: 'Top', icon: 'top', },
  { slug: '/add', title: 'Add', icon: 'add', },
  // { slug: '/map', title: 'Map', icon: 'map', },
];

exports.display = {
  getCategories: trans => trans.map( object => object._id.category ),
  
  getTransactions: (trans, category) => 
    trans.find(object => object._id.category === category).transactions,

  getGroup: (trans, category) =>
    trans.find(object => object._id.category === category)._id.group,

  sortTransactions(transactionArray) {
    return transactionArray.sort((a, b) => {
      // a and b have to be dates
      if (dateFns.isDate(a.date) && dateFns.isDate(b.date)) {
        // if a is after b, returns true
        if (dateFns.isAfter(a.date, b.date)) {
          return 1; // sort b to an index lower than a
        } else if (dateFns.isBefore(a.date, b.date)) {
          return -1; // sort a to an index lower than b
        } else {
          return 0; // leave a and b unchanged with respect to each other but sorted with respect to all different elements
        }
      } else {
        console.log('These are not dates...');
      }
    })
  },
  
  // adapted from http://www.jacklmoore.com/notes/rounding-in-javascript
  toPrice(value) {
    value /= 100;
    if(value < 0) {
      return '-$' + parseFloat(Math.round((value * -1) + "e" + 2) + "e-" + 2).toFixed(2);
    } else {
      return '$' + parseFloat(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
    }
    
  },

  // adapted from solution by https://github.com/jsonberry
  formatTheDate(date, format) {
    const [ year, month, day ] = (date.toISOString()).substr(0, 10).split('-');
    return dateFns.format(new Date(
      year,
      (month - 1),
      day,
    ), format);
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

exports.maths = {
  sumOfCategory(transactionArray) {
    return transactionArray.reduce(
      (total, trans) => total + trans.price,
      0
    );
  },

  sumOfGroup(catSumArray) {
    return catSumArray.reduce(
      (total, catSum) => total + catSum,
      0
    );
  },

  difference(income, expense) {
    return income - expense;
  }
};
