document.addEventListener('DOMContentLoaded', function() {
  // Login form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      let isValid = true;
      
      // Clear previous errors
      clearErrors();
      
      // Email validation
      if (!email.value.trim()) {
        showError(email, 'Email or phone number is required');
        isValid = false;
      } else if (!isValidEmailOrPhone(email.value.trim())) {
        showError(email, 'Please enter a valid email or phone number');
        isValid = false;
      } else {
        showValid(email);
      }
      
      // Password validation
      if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
      } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
      } else {
        showValid(password);
      }
      
      if (isValid) {
        this.submit();
      }
    });
    
    // Real-time validation for login form
    const loginInputs = loginForm.querySelectorAll('input');
    loginInputs.forEach(input => {
      input.addEventListener('input', function() {
        validateLoginField(this);
      });
    });
  }
  
  // Signup form validation
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      let isValid = true;
      
      // Clear previous errors
      clearErrors();
      
      // Email validation
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      } else {
        showValid(email);
      }
      
      // Phone validation
      if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
      } else if (!isValidPhone(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
      } else {
        showValid(phone);
      }
      
      // Password validation
      if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
      } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
      } else {
        showValid(password);
      }
      
      // Confirm password validation
      if (!confirmPassword.value.trim()) {
        showError(confirmPassword, 'Please confirm your password');
        isValid = false;
      } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
      } else {
        showValid(confirmPassword);
      }
      
      if (isValid) {
        this.submit();
      }
    });
    
    // Real-time validation for signup form
    const signupInputs = signupForm.querySelectorAll('input');
    signupInputs.forEach(input => {
      input.addEventListener('input', function() {
        validateSignupField(this);
      });
    });
  }
  
  // Validation functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }
  
  function isValidEmailOrPhone(value) {
    return isValidEmail(value) || isValidPhone(value);
  }
  
  function showError(input, message) {
    input.classList.add('error');
    input.classList.remove('valid');
    
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }
  
  function showValid(input) {
    input.classList.remove('error');
    input.classList.add('valid');
    
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }
  
  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
      error.style.display = 'none';
    });
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.classList.remove('error');
    });
  }
  
  function validateLoginField(input) {
    const value = input.value.trim();
    
    if (input.type === 'text' && input.name === 'email') {
      if (!value) {
        showError(input, 'Email or phone number is required');
      } else if (!isValidEmailOrPhone(value)) {
        showError(input, 'Please enter a valid email or phone number');
      } else {
        showValid(input);
      }
    }
    
    if (input.type === 'password') {
      if (!value) {
        showError(input, 'Password is required');
      } else if (value.length < 6) {
        showError(input, 'Password must be at least 6 characters');
      } else {
        showValid(input);
      }
    }
  }
  
  function validateSignupField(input) {
    const value = input.value.trim();
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (input.type === 'email') {
      if (!value) {
        showError(input, 'Email is required');
      } else if (!isValidEmail(value)) {
        showError(input, 'Please enter a valid email address');
      } else {
        showValid(input);
      }
    }
    
    if (input.type === 'tel') {
      if (!value) {
        showError(input, 'Phone number is required');
      } else if (!isValidPhone(value)) {
        showError(input, 'Please enter a valid phone number');
      } else {
        showValid(input);
      }
    }
    
    if (input.type === 'password' && input.name === 'password') {
      if (!value) {
        showError(input, 'Password is required');
      } else if (value.length < 6) {
        showError(input, 'Password must be at least 6 characters');
      } else {
        showValid(input);
        
        // Also validate confirm password if it has value
        if (confirmPassword.value) {
          validateSignupField(confirmPassword);
        }
      }
    }
    
    if (input.type === 'password' && input.name === 'confirmPassword') {
      if (!value) {
        showError(input, 'Please confirm your password');
      } else if (password.value !== value) {
        showError(input, 'Passwords do not match');
      } else {
        showValid(input);
      }
    }
  }
});