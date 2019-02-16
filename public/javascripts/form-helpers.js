// CD"?ZXK as named by Jiji

function populate(select1, select2) {
  let s1 = document.getElementById(select1);
  let s2 = document.getElementById(select2);
  s2.innerHTML = ""; // clear out whatever is in it already
  if(s1.value === 'expense') {
    var optionArray = [['','Select a Category'], ['Expense - Food','Food'], ['Expense - Transportation','Transportation'], ['Expense - Trips','Trips'], ['Expense - Gifts','Gifts'], ['Expense - Health','Health'], ['Expense - Beauty','Beauty'], ['Expense - Recreational Activities','Recreational Activities'], ['Expense - Shopping','Shopping'], ['Expense - Sports','Sports'], ['Expense - Pets','Pets'], ['Expense - Education','Education'], ['Expense - Entertainment','Entertainment'], ['Expense - Work','Work'], ['Expense - Housing','Housing'], ['Expense - Other','Other']];
  } else if(s1.value === 'income') {
    var optionArray = [['','Select a Category'], ['Income - Salary','Salary'], ['Income - Cash Back','Cash Back'], ['Income - Gifts','Gifts'], ['Income - Other','Other']];
  }
  else {
    var optionArray = [['','Select a Category']];
  }

  optionArray.forEach(function(option) {
    var newOption = document.createElement('option');
    newOption.value = option[0];
    newOption.innerHTML = option[1];
    s2.options.add(newOption);
  });
}