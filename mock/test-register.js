(async () => {
  try {
    const url = 'http://localhost:3001/auth/register';
    const newUser = { name: 'Auto Test', email: 'autotest@demo.com', password: 'password123' };

    console.log('Posting to', url, 'payload:', newUser);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    const data = await res.json().catch(() => ({}));
    console.log('Status:', res.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
})();
