/* =========================================
   NORTH STAR BAKERY - TOUCHSTONE 4 JAVASCRIPT
   ========================================= */

// 1. DATA STRUCTURES (Objects and Arrays for Products & Form State)
const bakeryProducts = [
  { id: 'item1', name: 'Signature Sourdough Loaf', price: '$8.00' },
  { id: 'item2', name: 'Almond Butter Croissant', price: '$4.50' },
  { id: 'item3', name: 'Fresh Berry Fruit Tart', price: '$6.00' }
];

const userPreferences = {
  favoriteItem: '',
  lastOrderEmail: ''
};

// 2. INTERACTIVE FEATURE & BROWSER STORAGE (Favorites Tracker)
function handleFavoriteSelection() {
  const selectElement = document.getElementById('favorite-product-select');
  const displayMessage = document.getElementById('favorite-display-message');

  if (!selectElement || !displayMessage) return;

  const selectedId = selectElement.value;
  
  if (selectedId === "") {
    displayMessage.textContent = "Please select a favorite item to save your preference.";
    displayMessage.style.color = "#6B3E26";
    return;
  }

  // Find product using array method
  const chosenProduct = bakeryProducts.find(product => product.id === selectedId);
  
  if (chosenProduct) {
    userPreferences.favoriteItem = chosenProduct.name;
    
    // Save to localStorage
    localStorage.setItem('nsb_favorite', chosenProduct.name);

    // Dynamic page update
    displayMessage.textContent = `Success! Your favorite "${chosenProduct.name}" (${chosenProduct.price}) has been remembered for your next visit.`;
    displayMessage.style.color = "#D88C5A";
  }
}

// Load stored data on page load
function loadStoredPreferences() {
  const savedFavorite = localStorage.getItem('nsb_favorite');
  const displayMessage = document.getElementById('favorite-display-message');
  const selectElement = document.getElementById('favorite-product-select');

  if (savedFavorite && displayMessage && selectElement) {
    userPreferences.favoriteItem = savedFavorite;
    displayMessage.textContent = `Welcome back! We remembered your favorite item: "${savedFavorite}".`;
    displayMessage.style.color = "#D88C5A";

    // Pre-select matching dropdown option if possible
    for (let option of selectElement.options) {
      if (option.text.includes(savedFavorite)) {
        option.selected = true;
        break;
      }
    }
  }
}

// 3. FORM VALIDATION WITH INLINE FEEDBACK
function validatePreOrderForm(event) {
  // Prevent form submission by default
  let isValid = true;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');

  // Reset error messages
  if (nameError) nameError.textContent = '';
  if (emailError) emailError.textContent = '';

  // Required Field Check (Name)
  if (!nameInput || nameInput.value.trim() === '') {
    if (nameError) {
      nameError.textContent = 'Error: Please enter your full name.';
      nameError.style.color = '#d9534f';
    }
    isValid = false;
  }

  // Email Format Validation Check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
    if (emailError) {
      emailError.textContent = 'Error: Please enter a valid email address (e.g., name@example.com).';
      emailError.style.color = '#d9534f';
    }
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault(); // Stop submission if validation fails
  } else {
    // Store email in sessionStorage as part of data storage requirement
    sessionStorage.setItem('nsb_last_email', emailInput.value.trim());
  }
}

// Event Listeners Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  loadStoredPreferences();

  const favButton = document.getElementById('save-favorite-btn');
  if (favButton) {
    favButton.addEventListener('click', handleFavoriteSelection);
  }

  const orderForm = document.getElementById('preorder-form');
  if (orderForm) {
    orderForm.addEventListener('submit', validatePreOrderForm);
  }
});
