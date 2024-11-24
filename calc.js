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

  var data = "./Data/Test.csv"
  
  // Parse CSV and convert to array
  var parsed = deserializeCSV(data);

  //Search for row number
  var query = "76";
  var flat = [].concat.apply([], parsed);
  var col = flat.indexOf(query);
  var row = -1;
  if (col != -1) // found, now need to extract the row
    while (parsed[++row].length <= col) // not this row
      col -= parsed[row].length; // so adjust and try again

  document.getElementById('output').innerHTML = row;
}
