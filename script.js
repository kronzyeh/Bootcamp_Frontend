document.getElementById('addFruitForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  addFruit();
  displayFruit();
  updateTotalQuantity();
});

function addFruit(){
  // Get form inputs
  var nameInput = document.getElementById('fruit-name');
  var quantityInput = document.getElementById('fruit-quantity');
  // Get fruit details from input
  var name = nameInput.value;
  var quantity = quantityInput.value;
  // Create fruit object
  var fruit = {
    name: name,
    quantity: quantity
  };
  // Get existing fruit list from cache
  var fruitList = JSON.parse(localStorage.getItem('fruitList')) || [];
  // Add the new fruit to the list
  fruitList.push(fruit);
  // Store the updated list in cache
  localStorage.setItem('fruitList', JSON.stringify(fruitList));
  // Optional: Display a success message or perform any other actions
  console.log('Fruit added successfully!');
  updateTotalQuantity();
}

function displayFruit() {
  var tableBody = document.querySelector('.tablerino tbody');
  tableBody.innerHTML = '';

  var fruitList = JSON.parse(localStorage.getItem('fruitList')) || [];
  fruitList.forEach(function(fruit, index) {
    var row = document.createElement('tr');
    
    var nameCell = document.createElement('td');
    nameCell.textContent = fruit.name;
    
    var quantityCell = document.createElement('td');
    quantityCell.textContent = fruit.quantity;
    
    var actionCell = document.createElement('td');
    actionCell.className = 'action-cell'; // Add a CSS class for styling
    
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      editFruit(index);
    });
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteFruit(index);
    });
    
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(actionCell);
    
    tableBody.appendChild(row);
  });
}

document.getElementById('read-button').addEventListener('click', function() {
  displayFruit();
});

function deleteFruit(index) {
  var fruitList = JSON.parse(localStorage.getItem('fruitList')) || [];
  if (index >= 0 && index < fruitList.length) {
    fruitList.splice(index, 1);
    localStorage.setItem('fruitList', JSON.stringify(fruitList));
    displayFruit(); // Refresh the table after deletion
    updateTotalQuantity();
  }
}

function editFruit(index) {
  var fruitList = JSON.parse(localStorage.getItem('fruitList')) || [];
  if (index >= 0 && index < fruitList.length) {
    var updatedName = prompt('Enter the updated name:');
    var updatedQuantity = prompt('Enter the updated quantity:');
    
    if (updatedName && updatedQuantity) {
      fruitList[index].name = updatedName;
      fruitList[index].quantity = updatedQuantity;
      localStorage.setItem('fruitList', JSON.stringify(fruitList));
      displayFruit(); // Refresh the table after editing
    }
  }
}

document.getElementById('search-button').addEventListener('click', function() {
  var searchTerm = document.getElementById('search-input').value;
  filterFruitList(searchTerm);
});

function filterFruitList(searchTerm) {
  var tableBody = document.querySelector('.tablerino tbody');
  tableBody.innerHTML = '';

  var fruitList = JSON.parse(localStorage.getItem('fruitList')) || [];
  var filteredFruitList = fruitList.filter(function(fruit) {
    return fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  filteredFruitList.forEach(function(fruit, index) {
    var row = document.createElement('tr');

    var nameCell = document.createElement('td');
    nameCell.textContent = fruit.name;

    var quantityCell = document.createElement('td');
    quantityCell.textContent = fruit.quantity;

    var actionCell = document.createElement('td');
    actionCell.className = 'action-cell';

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      editFruit(index);
    });

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteFruit(index);
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}
function updateTotalQuantity() {
  var countElement = document.getElementById('count');
  var fruitList = JSON.parse(localStorage.getItem('fruitList')) || [];
  var totalQuantity = 0;

  fruitList.forEach(function(fruit) {
    totalQuantity += parseInt(fruit.quantity);
  });

  countElement.textContent = totalQuantity;
}

// Call the function to update the total quantity initially
updateTotalQuantity();
document.addEventListener('DOMContentLoaded', function() {
  displayFruit();
});