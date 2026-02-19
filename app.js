// Pages
const loginPage = document.getElementById('login-page');
const itemsPage = document.getElementById('items-page');
const glamPage = document.getElementById('glam-page');

// Buttons
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const doneItemsBtn = document.getElementById('doneItemsBtn');
const doneServicesBtn = document.getElementById('doneServicesBtn');

// Inputs
const userIdInput = document.getElementById('userId');
const passwordInput = document.getElementById('password');
const memberCheckbox = document.getElementById('memberCheckbox');

// Selected arrays
let selectedItems = [];
let selectedServices = [];

// Toggle selection for items
document.querySelectorAll('.item').forEach(el => {
  el.addEventListener('click', () => {
    const name = el.dataset.name;
    if (selectedItems.includes(name)) {
      selectedItems = selectedItems.filter(i => i !== name);
      el.style.backgroundColor = '';
    } else {
      selectedItems.push(name);
      el.style.backgroundColor = '#cce5ff';
    }
  });
});

// Toggle selection for services
document.querySelectorAll('.service').forEach(el => {
  el.addEventListener('click', () => {
    const name = el.dataset.name;
    if (selectedServices.includes(name)) {
      selectedServices = selectedServices.filter(i => i !== name);
      el.style.backgroundColor = '';
    } else {
      selectedServices.push(name);
      el.style.backgroundColor = '#cce5ff';
    }
  });
});

// Done buttons
doneItemsBtn.addEventListener('click', () => {
  const list = document.getElementById('selectedItemsList');
  list.innerHTML = '';
  if (selectedItems.length === 0) {
    alert('Please select at least one item.');
    return;
  }
  selectedItems.forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    list.appendChild(li);
  });
  alert('Items selection done!');
});

doneServicesBtn.addEventListener('click', () => {
  const list = document.getElementById('selectedServicesList');
  list.innerHTML = '';
  if (selectedServices.length === 0) {
    alert('Please select at least one service.');
    return;
  }
  selectedServices.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    list.appendChild(li);
  });
  alert('Services selection done!');
});

// Signup / Login
signupBtn.addEventListener('click', () => {
  if (userIdInput.value && passwordInput.value) {
    alert(`Signed up as ${userIdInput.value} ${memberCheckbox.checked ? '(Member)' : ''}`);
    loginPage.style.display = 'none';
    itemsPage.style.display = 'block';
  } else {
    alert('Please enter Access ID and Password.');
  }
});

loginBtn.addEventListener('click', () => {
  if (userIdInput.value && passwordInput.value) {
    alert(`Logged in as ${userIdInput.value} ${memberCheckbox.checked ? '(Member)' : ''}`);
    loginPage.style.display = 'none';
    itemsPage.style.display = 'block';
  } else {
    alert('Please enter Access ID and Password.');
  }
});