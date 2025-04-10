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
showRecentExpenses();

function showRecentExpenses() {
	const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
	const recent = expenses.slice(-3).reverse(); // last 3, newest first

	const exlist = document.getElementById('expense-list');
	exlist.innerHTML = ''; // clear old list

	recent.forEach(exp => {
		const item = document.createElement('li');
		item.textContent = `${exp.date} ${exp.time}: ${exp.category} - ₹${exp.amount}`;
		exlist.appendChild(item);
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

	const expense = {
		amount: amount,
		category: category,
		date: formattedDate,
		time: formattedTime
	};

	// Get existing expenses
	const existing = JSON.parse(localStorage.getItem('expenses') || '[]');
	existing.push(expense);

	// Update localStorage
	localStorage.setItem('expenses', JSON.stringify(existing));

	// Subtract expense from balance
	const newBalance = currentBalance - amount;
	localStorage.setItem('balance', newBalance.toString());

	// Clear inputs
	amountInput.value = '';
	categoryInput.value = '';
	saveButton.textContent = 'Saved!';
	
	updateDisplay();
	showRecentExpenses();
  }
});
