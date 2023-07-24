export async function loginUser ({ username, password }) {
  const response = await fetch('http://localhost:3300/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  return data;
}

export async function registerUser ({ username, password }) {
  const response = await fetch('http://localhost:3300/api/users', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  return data;
}
