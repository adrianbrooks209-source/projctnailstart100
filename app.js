// Pages
const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');

// Buttons
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const doneBtn = document.getElementById('doneBtn');

// Inputs
const userIdInput = document.getElementById('userId');
const passwordInput = document.getElementById('password');
const memberCheckbox = document.getElementById('memberCheckbox');

// Containers
const itemsContainer = document.getElementById('items-container');
const servicesContainer = document.getElementById('services-container');
const selectedList = document.getElementById('selectedList');

// Selected items/services
let selected = [];

// Toggle selection
function toggleSelection(element) {
  const name = element.dataset.name;
  if (selected.includes(name)) {
    selected = selected.filter(i => i !== name);
    element.style.backgroundColor = '';
  } else {
    selected.push(name);
    element.style.backgroundColor = '#cce5ff';
  }
  renderSelected();
}

// Render selected list
function renderSelected() {
  selectedList.innerHTML = '';
  selected.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    selectedList.appendChild(li);
  });
}

// Event listeners for items
document.querySelectorAll('.item').forEach(el => {
  el.addEventListener('click', () => toggleSelection(el));
});

// Event listeners for services
document.querySelectorAll('.service').forEach(el => {
  el.addEventListener('click', () => toggleSelection(el));
});

// Done button
doneBtn.addEventListener('click', () => {
  if (selected.length === 0) {
    alert('Please select at least one item or service.');
    return;
  }
  alert('Selection complete!');
  // Clear selections after done
  selected = [];
  document.querySelectorAll('.item, .service').forEach(el => el.style.backgroundColor = '');
  renderSelected();
});

// Signup / Login simulation
signupBtn.addEventListener('click', () => {
  if (userIdInput.value && passwordInput.value) {
    alert(`Signed up as ${userIdInput.value} ${memberCheckbox.checked ? '(Member)' : ''}`);
    loginPage.style.display = 'none';
    mainPage.style.display = 'block';
  } else {
    alert('Please enter Access ID and Password.');
  }
});

loginBtn.addEventListener('click', () => {
  if (userIdInput.value && passwordInput.value) {
    alert(`Logged in as ${userIdInput.value} ${memberCheckbox.checked ? '(Member)' : ''}`);
    loginPage.style.display = 'none';
    mainPage.style.display = 'block';
  } else {
    alert('Please enter Access ID and Password.');
  }
});