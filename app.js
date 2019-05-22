// Listen for submit
const loanBtn = document.querySelector('#loan-form');

// calculate Results

const calculateResults = () => { 

  // UI vars
  const amount = document.querySelector('#amount').value;
  const interest = document.querySelector('#interest').value;
  const years = document.querySelector('#years').value;

  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount);
  const calculatedInterest = parseFloat(interest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Hide results
    const result = document.querySelector('#results');
    result.style.display = 'block';

    // Show Loader
    const load = document.querySelector('#loading');
    load.style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// show error
const showError = (error) => {
  // Hide results
  const result = document.querySelector('#results');
  result.style.display = 'none';

  // Hide Loader
  const load = document.querySelector('#loading');
  load.style.display = 'none';

  // create div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  //create Text-node
  const errorNode = document.createTextNode(error);

  // append to div
  errorDiv.appendChild(errorNode);

  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  
  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

const clearError = () => {
  document.querySelector('.alert').remove();
}

const loading = (e) => {
  e.preventDefault();
  // Hide results
  const result = document.querySelector('#results');
  result.style.display = 'none';

  // Show Loader
  const load = document.querySelector('#loading');
  load.style.display = 'block';

  setTimeout(calculateResults, 2000);
}

loanBtn.addEventListener('submit', loading);

