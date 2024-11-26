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
