// [HCPCS Code, Drug Name, HCPCS Code Strength, [available strengths]]
const arrDrugs = [
  ["J7500","IMURAN (azathioprine)",50,[25,50,75,100]],
  ["J7515","NEORAL (cyclosporine) 25mg",25,[25]],
  ["J7502","NEORAL (cyclosporine) 100mg",100,[100]],
  ["J7517","CELLCEPT (mycophenolate mofetil)",250,[250,500]],
  ["J7518","MYFORTIC (mycophenolic acid)",180,[180,360]],
  ["J7527","ZORTRESS (everolimus)",0.25,[0.25,0.5,0.75]],
  ["J7520","RAPAMUNE (sirolimus)",1,[0.5,1]],
  ["J7503","ENVARSUS (tacrolimus)", 0.25,[0.75,1,4]],
  ["J7507","PROGRAF (tacrolimus)",1,[0.5,1,5]],
  ["J7508","ASTAGRAF (tacrolimus)",0.1,[0.5,1,5]],
  ["J7509","methylprednisolone",4,[4,8,16,32]],
  ["J7510","prednisolone",5,[5]],
  ["J7512","prednisone",1,[1,5,10]]
];

/**
 * Load CSV URLs to dropdown with Github API and load drugs from array.
 * Triggered on loading of window.
 */
window.onload = function() {
  loadPricingData();
  loadDrugs();
}

// https://stackoverflow.com/questions/39048654/how-to-enable-directory-indexing-on-github-pages
// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28
/**
 * Load CSV URLs to dropdown with Github API.
 * Triggered on loading of window.
 */
async function loadPricingData() {
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

// https://stackoverflow.com/questions/19259233/sorting-json-by-specific-element-alphabetically
/**
 * Sort JSON alphanumeric Z to A.
 * @param {string} a First string to compare.
 * @param {string} b Second string to compare.
 * @return Object with compared strings.
 */
function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a > b) ? -1 : (a < b) ? 1 : 0;
}
/**
 * Load drug to dropdown from array.
 * Triggered on loading of window.
 */
function loadDrugs() {
  for (let i = 0; i < arrDrugs.length; i++) {
    let drugName = document.createElement('option');
    drugName.value = arrDrugs[i][0];
    drugName.innerHTML = arrDrugs[i][1];
    document.getElementById('drugName').append(drugName);
  }
}

// https://uufishtxl.github.io/js_api_fetch_csv.html
// https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/
/**
 * Retrieve pricing data from Github URL from dropdown.
 * @return Dictionary with HCPCS code as keys and payment limit as values.
 */
async function getPricingData() {
  const code = [];
  const limit = [];
  let dict = {};
  const response = await fetch(document.getElementById('pricingData').value);
  const data = await response.text();
  const table = data.split(/\n/).slice(1,-1);
  table.forEach(row => {
    const columns = row.split(',');
    const HCPCS = columns[0];
    code.push(HCPCS);
    const paymentLimit = columns[1];
    limit.push(parseFloat(paymentLimit));
    dict[HCPCS] = paymentLimit;
  })
  return dict
}

// https://www.mindstick.com/blog/304378/how-can-you-dynamically-add-and-remove-form-fields-using-javascript
// https://stackoverflow.com/questions/72389096/how-to-store-the-json-data-from-fetch-api-request-into-a-global-variable-javas
/**
 * Create dynamic fields to add drugs (name, strength, and number of tablets).
 * Store payment limit information for each strength in strength dropdown.
 * Create remove button for each line.
 */
document.addEventListener('DOMContentLoaded', function() {
  const fieldDrugList = document.getElementById('fieldDrugList');
  const addButton = document.getElementById('addButton');

  addButton.addEventListener('click', function() {
      addField();
  });

  function addField() {
    // Create a new div to hold the input and remove button
    const div = document.createElement('div');
    div.classList.add('field-DrugList');

    // Create strength dropdown with adjusted value
    const drugIndex = document.getElementById('drugName').selectedIndex;
    let selectStrength = document.createElement('select');
    selectStrength.id = 'selectStrength';
    selectStrength.classList.add('drugListInfo');
    for (let i = 0; i < arrDrugs[drugIndex][3].length; i++) {
      let strength = document.createElement('option');
      (async () => {
        const data = await getPricingData();
        // (Strength / HCPCS Strength ) * Payment Limit
        let paymentLimit = (parseFloat(arrDrugs[drugIndex][3][i]) / parseFloat(arrDrugs[drugIndex][2])) * parseFloat(data[arrDrugs[drugIndex][0]]);
        strength.value = paymentLimit.toFixed(4);
      })();
      strength.innerHTML = arrDrugs[drugIndex][3][i]+" mg";
      div.appendChild(selectStrength).append(strength);
    }

    // Create drug name label
    const drugLabel = document.createElement('label');
    drugLabel.id = 'drugLabel';
    drugLabel.for = 'selectStrength';
    drugLabel.classList.add('drugListInfo');
    drugLabel.innerHTML = arrDrugs[drugIndex][1];

    // Create # of tablets input
    const numTablets = document.createElement('input');
    numTablets.type = 'number';
    numTablets.id = 'numTablets';
    numTablets.classList.add('drugListInfo');
    numTablets.placeholder = 'Enter number of tablets';

    // Create the remove button
    const removeButton = document.createElement('span');
    removeButton.classList.add('remove-button');
    //removeButton.textContent = 'Remove';
    removeButton.innerHTML = '<b>&times;</b>'
    removeButton.addEventListener('click', function() {
      removeField(div);
    });

    // Append the input and remove button to the div
    div.appendChild(drugLabel);
    div.appendChild(selectStrength);
    div.appendChild(numTablets);
    div.appendChild(removeButton);

    // Append the div to the field container
    fieldDrugList.appendChild(div);
  }

  function removeField(div) {
    fieldDrugList.removeChild(div);
  }
});

/**
 * Hide tables from displaying.
 */
function hideTables() {
  document.getElementById('tblDetail').style.display = 'none';
  document.getElementById('tblBasic').style.display = 'none';
}

// https://stackoverflow.com/questions/48996441/javascript-iterate-over-form-inputs-and-collect-values-as-key-value-pairs-in-o
/**
 * Calculate copays and display in table.
 * Triggered by onclick event.
 */
function calc() {
  // Declare table variables and clear old data
  const tblDetail = document.getElementById('tblDetailData');
  tblDetail.innerHTML = '';
  const tblBasic = document.getElementById('tblBasicData');
  tblBasic.innerHTML = '';
  hideTables();
  // Validate drugs are added
  if (document.getElementById('fieldDrugList').innerText.length == 0) {
    return alert('No drugs added');
  }
  // Declare variable and extract info from form
  // Loops through every element with class name drugListInfo (3 elements per row)
  let divs = document.querySelectorAll('.drugListInfo');
  let counter = 0;
  let drugName;
  let drugStrength;
  let numTablets;
  let paymentLimit;
  let medicare;
  let copay;
  let totalMedicare = 0;
  let totalCopay = 0;
  let err = false;
  divs.forEach((div) => {
    if (div.id == 'drugLabel') {
      drugName = div.innerHTML;
    }
    if (div.id == 'selectStrength') {
      drugStrength = div.options[div.selectedIndex].text;
      paymentLimit = div.value;
    }
    if (div.id == 'numTablets') {
      numTablets = div.value;
      // Data Validation
      if (numTablets <= 0) {
        alert('Invalid number of tablets for '+drugName+' '+drugStrength);
        err = true;
      }
    }
    if (counter == 2) {
      // Formulas:
      // 80% Medicare Coverage = Payment limit * # of tablets
      // 20% Copay = Payment limit * # of tablets * 0.25
      medicare = parseFloat(paymentLimit) * parseFloat(numTablets);
      copay = medicare * 0.25;
      // Add to running total
      totalMedicare += medicare;
      totalCopay += copay;
      let rowDetail = tblDetail.insertRow();
      rowDetail.insertCell().textContent = drugName;
      rowDetail.insertCell().textContent = drugStrength;
      rowDetail.insertCell().textContent = numTablets;
      rowDetail.insertCell().textContent = '$'+medicare.toFixed(4);
      rowDetail.insertCell().textContent = '$'+copay.toFixed(4);
      let rowBasic = tblBasic.insertRow();
      rowBasic.insertCell().textContent = drugName+' '+drugStrength+' #'+numTablets
      rowBasic.insertCell().textContent = '$'+copay.toFixed(4);
      counter = 0;
    } else {
      counter += 1;
    }
  });
  if (err == false) {
    // Insert totals and display tables
    let rowDetail = tblDetail.insertRow();
    rowDetail.insertCell().textContent = 'Total:';
    rowDetail.insertCell().textContent = '';
    rowDetail.insertCell().textContent = '';
    rowDetail.insertCell().textContent = '$'+totalMedicare.toFixed(4);
    rowDetail.insertCell().textContent = '$'+totalCopay.toFixed(4);
    document.getElementById('tblDetail').style.display = 'block';
    let rowBasic = tblBasic.insertRow();
    rowBasic.insertCell().textContent = 'Total:';
    rowBasic.insertCell().textContent = '$'+totalCopay.toFixed(4);
    document.getElementById('tblBasic').style.display = 'block';
  } else {
    // Clear tables
    tblDetail.innerHTML = '';
    tblBasic.innerHTML = '';
  }
}

/**
 * Copies days supply result and displays alert.
 * Triggered by onclick event.
 */
function copyText() {
  var result = document.getElementById('tblBasicData').innerText;
  if (document.getElementById('tblBasicData').innerText.length == 0) {
    alert('No text found');
  } else {
    navigator.clipboard.writeText(result);
    document.getElementById('copyAlert').style.display = 'block';
    document.getElementById('copyAlert').innerHTML = 'Text copied!';
    setTimeout(function() {
      document.getElementById('copyAlert').innerHTML = '';
      document.getElementById('copyAlert').style.display = 'none';
    }, 2000);
  }
}
