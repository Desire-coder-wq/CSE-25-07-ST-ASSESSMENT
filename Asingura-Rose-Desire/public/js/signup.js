const form = document.getElementById('signupForm');
const inputs = document.querySelectorAll('.form-input');
const successAlert = document.getElementById('successAlert');

// Real-time input validation
inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.value.trim()) {
      input.classList.add('valid');
      input.classList.remove('invalid');
    }
  });
});

// Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('invalid');
      isValid = false;
    } else {
      input.classList.remove('invalid');
      input.classList.add('valid');
    }
  });

  if (!isValid) return;

  const data = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phoneNumber').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value
  };

  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      form.style.display = 'none';
      successAlert.style.display = 'block';
      setTimeout(() => { window.location.href = '/auth/login'; }, 2000);
    } else {
      alert(result.message);
      inputs.forEach(input => input.classList.add('invalid'));
    }

  } catch (err) {
    console.error(err);
    alert('Signup failed');
  }
});
