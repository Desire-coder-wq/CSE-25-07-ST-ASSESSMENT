const form = document.querySelector('form');
const emailInput = form.querySelector('input[name="email"]');
const passwordInput = form.querySelector('input[name="password"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) return alert('Email and password are required');
  if (password.length < 6) return alert('Password must be at least 6 characters');

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = result.redirect;
    } else {
      alert(result.message);
    }

  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
});
