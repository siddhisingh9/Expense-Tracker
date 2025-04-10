const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const saveButton = document.getElementById('save');
const balanceDisplay = document.getElementById('accbal');

// Set initial balance if not present
if (!localStorage.getItem('balance')) {
  localStorage.setItem('balance', '0');
}

function updateDisplay() {
  const balance = parseFloat(localStorage.getItem('balance'));
  balanceDisplay.textContent = `Current Balance: ₹${balance.toFixed(2)}`;
}

updateDisplay();
showRecentIncomes();

function showRecentIncomes() {
	const incomes = JSON.parse(localStorage.getItem('incomes') || '[]');
	const recent = incomes.slice(-3).reverse(); // last 3, newest first

	const inlist = document.getElementById('income-list');
	inlist.innerHTML = ''; // clear old list

	recent.forEach(inc => {
		const item = document.createElement('li');
		item.textContent = `${inc.date} ${inc.time}: ${inc.category} - ₹${inc.amount}`;
		inlist.appendChild(item);
  });
  }
  

saveButton.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();
  let currentBalance = parseFloat(localStorage.getItem('balance'));

  if (!isNaN(amount) && category !== '') {
	const now = new Date();

	// Format date as DD/MM/YY
	const day = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = String(now.getFullYear()).slice(-2);
	const formattedDate = `${day}/${month}/${year}`;

	// Format time as HH:MM
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const formattedTime = `${hours}:${minutes}`;

	const income = {
		amount: amount,
		category: category,
		date: formattedDate,
		time: formattedTime
	};

	// Get existing incomes
	const existing = JSON.parse(localStorage.getItem('incomes') || '[]');
	existing.push(income);

	// Update localStorage
	localStorage.setItem('incomes', JSON.stringify(existing));

	// Add income to balance
	const newBalance = currentBalance + amount;
	localStorage.setItem('balance', newBalance.toString());

	// Clear inputs
	amountInput.value = '';
	categoryInput.value = '';
	saveButton.textContent = 'Saved!';
	
	updateDisplay();
	showRecentIncomes();
  }
});
