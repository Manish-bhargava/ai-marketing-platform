// src/services/apiService.js
const BASE_URL = 'http://localhost:3000/api/v1'; // change if needed

// Helper function to safely handle both JSON and text responses
async function handleResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch {
    // if not JSON, read as text
    const text = await response.text();
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

const apiService = {
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  async signup(email, password) {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  async onboard(onboardingData) {
    const response = await fetch(`${BASE_URL}/auth/onboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(onboardingData),
    });
    return handleResponse(response);
  },
};

export default apiService;
