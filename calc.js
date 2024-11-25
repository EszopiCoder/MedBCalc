// Load CSV URL to dropdown
window.onload = function() {
  loadData();
}
// Resources:
// https://stackoverflow.com/questions/39048654/how-to-enable-directory-indexing-on-github-pages
// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28
async function loadData() {
  // Fetch file locations from Github
  const response = await fetch('https://api.github.com/repos/eszopicoder/medbcalc/contents/Data');
  const data = await response.json();
  // Sort data Z to A
  data.sort(function(a, b) {
    return compareStrings(a.name, b.name);
  })
  // Add to dropdown
  for (let file of data) {
    let pricingData = document.createElement('option');
    pricingData.value = file.download_url;
    pricingData.innerHTML = file.name;
    document.getElementById('pricingData').append(pricingData);
  }
}
// Sort JSON alphanumeric Z to A
// https://stackoverflow.com/questions/19259233/sorting-json-by-specific-element-alphabetically
function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a > b) ? -1 : (a < b) ? 1 : 0;
}


// Source: https://www.30secondsofcode.org/js/s/convert-csv-to-array-object-or-json/
// Parse 1 row of CSV and convert to array
const deserializeRow = (row, delimiter = ',') => {
  const values = [];
  let index = 0, matchStart = 0, isInsideQuotations = false;
  while (true) {
    if (index === row.length) {
      values.push(row.slice(matchStart, index));
      break;
    }
    const char = row[index];
    if (char === delimiter && !isInsideQuotations) {
      values.push(
        row
          .slice(matchStart, index)
          .replace(/^"|"$/g, '')
          .replace(/""/g, '"')
          .replace(/\\n/g, '\n')
      );
      matchStart = index + 1;
    }
    if (char === '"')
      if (row[index + 1] === '"') index += 1;
      else isInsideQuotations = !isInsideQuotations;
    index += 1;
  }
  return values;
};
// Parse all rows of CSV and convert to array
const deserializeCSV = (data, delimiter = ',') =>
  data.split('\n').map(row => deserializeRow(row, delimiter));

function findRow() {
  // Source: https://stackoverflow.com/questions/4916880/cleanest-way-to-search-a-2d-array
  // Import data
  //var data = "foo,bar,baz\n42,33,42\n12,76,54\n13,42,17";
  
  // Parse CSV and convert to array
  var parsed = deserializeCSV(https://eszopicoder.github.io/MedBCalc/Data/Test.csv);
  
  //Search for row number
  var query = "J7515";
  var flat = [].concat.apply([], parsed);
  var col = flat.indexOf(query);
  var row = -1;
  if (col != -1) // found, now need to extract the row
    while (parsed[++row].length <= col) // not this row
      col -= parsed[row].length; // so adjust and try again

  document.getElementById('output').innerHTML = data;
}
