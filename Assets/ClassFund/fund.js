document.addEventListener('DOMContentLoaded', function(){
    loadRecords();
});

function addData(){
    const nameInput = document.getElementById('name');
    const feeInput = document.getElementById('fee');


    const name = nameInput.value.trim();
    const fee = parseInt(feeInput.value);
    const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2); // Taking only the last two digits

      const formattedDate = `${month}/${day}/${year}`;


    const records = getRecords();

      const update = records.some(record => record.name === name);

        if (update) {

          const updatedRecord = {name, fee, formattedDate};
          saveRecord(updatedRecord);

        } 
        else {

          if(name && !isNaN(fee) && formattedDate){
            const record = { name, fee, formattedDate};
            saveRecord(record);
            clearForm();
            loadRecords();
            }
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
      li.innerHTML = `<strong>${record.name}</strong>: $${record.fee.toFixed(2)} for
      <button onclick="deleteRecordFromSearch(${index})">Delete</button>
      <button onclick="editRecord(${index})">Edit</button>`;

      recordList.appendChild(li);
    });
  
    // Hide or show the recordList based on whether there are records
    recordList.style.display = records.length > 0 ? 'block' : 'none';
  }

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('fee').value = '';
}
  


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
            row.innerHTML = `<td>${record.name}</td><td>Php ${record.fee.toFixed(2)}</td>
            <td><button class="delete-btn" onclick="deleteRecordFromSearch(${index})">Delete</button>
            <button class="edit-btn" onclick="editRecords(${index})">Edit</button>
            </td><td>${record.formattedDate}</td>
            <td>${'<i class="bi bi-check-square-fill"></i>'}`;
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


  function editRecords(index) {
    let records = getRecords();
    const recordToEdit = records[index];

    // Populate the form with the record's data for editing
    document.getElementById('name').value = recordToEdit.name;
    document.getElementById('fee').value = recordToEdit.fee;

    // Delete the record from the records array
    records.splice(index, 1);

    // Save the updated records array to localStorage
    localStorage.setItem('records', JSON.stringify(records));

    // Reload and display records after editing
    loadRecords();
    searchRecords();
}

  

  //TOAST
  document.addEventListener('DOMContentLoaded', function () {
    var myToast = new bootstrap.Toast(document.getElementById('myToast'));
    myToast.show();
});



// todo for the clock

document.addEventListener('DOMContentLoaded', function() {
    updateTime(); // Initial call to set the time immediately
    setInterval(updateTime, 1000); // Update time every second
});

function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 24-hour format to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const dayOfWeek = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = currentTime.getDate();
    const month = currentTime.toLocaleDateString('en-US', { month: 'long' });

    document.getElementById('hours').textContent = formattedHours;
    document.getElementById('minutes').textContent = formattedMinutes;
    document.querySelector('.time-sub-text').textContent = ampm;
    document.getElementById('day-text').textContent = `${dayOfWeek}, ${month} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}`;

    
}

function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}