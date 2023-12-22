document.addEventListener('DOMContentLoaded', function(){
    loadRecords();
});

function addData(){
    const nameInput = document.getElementById('name');
    const schoolIdInput = document.getElementById('school-id');
    const feeInput = document.getElementById('fee');
    const eventInput = document.getElementById('event');


    const name = nameInput.value.trim();
    const schoolId = schoolIdInput.value.trim();
    const fee = parseInt(feeInput.value);
    const event = eventInput.value.trim();

        if(name && schoolId && !isNaN(fee) && event){
            const record = { name, schoolId, fee, event };
            saveRecord(record);
            clearForm();
            loadRecords();
        }
}

function saveRecord(record) {
    let records = getRecords();
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));
}

function getRecords(){
    return JSON.parse(localStorage.getItem('records')) || [];
}

function loadRecords() {
    const recordList = document.getElementById('recordList');
    recordList.innerHTML = '';
  
    const records = getRecords();
    records.forEach((record, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${record.name}</strong>: $${record.fee.toFixed(2)} for ${record.event} <button onclick="deleteRecordFromSearch(${index})">Delete</button>`;
      recordList.appendChild(li);
    });
  
    // Hide or show the recordList based on whether there are records
    recordList.style.display = records.length > 0 ? 'block' : 'none';
  }

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('school-id').value = '';
    document.getElementById('fee').value = '';
    document.getElementById('event').value = '';
}
  
//   function deleteRecord(index) {
//     let records = getRecords();
//     records.splice(index, 1);
//     localStorage.setItem('records', JSON.stringify(records));
//     loadRecords();
//   }



  function searchRecords() {
    const searchInput = document.getElementById('search');
    const searchTerm = searchInput.value.trim().toLowerCase();
  
    const records = getRecords();
    const filteredRecords = searchTerm
      ? records.filter(record => record.name.toLowerCase() === searchTerm)
      : [];
  
    displaySearchResults(filteredRecords);
  }
  
  
  function displaySearchResults(results) {
    const searchResultsTable = document.getElementById('searchResults').getElementsByTagName('tbody')[0];
    searchResultsTable.innerHTML = '';

    if (results.length > 0) {
        results.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${record.name}</td><td>${record.schoolId}</td><td>Php ${record.fee.toFixed(2)}</td><td>${record.event}</td><td><button class="delete-btn" onclick="deleteRecordFromSearch(${index})">Delete</button></td>`;
            searchResultsTable.appendChild(row);
        });
    } else {
        // If no results, display a message or hide the table
        searchResultsTable.innerHTML = '<tr><td colspan="5">No results found.</td></tr>';
    }
}


  function deleteRecordFromSearch(index) {
    let records = getRecords();
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    
    // Load and display records immediately after deletion
    loadRecords();
    searchRecords();

    displaySearchResults([]);

  }
  
  