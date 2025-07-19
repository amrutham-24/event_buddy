// login.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://zkjffgdvqjuoqxwaipaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // keep this safe
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exported login function
export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) console.error('Login error:', error);
}

// Exported logout function
export async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// Exported function to get role from `profiles` table
export async function getRole(userId) {
  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();
  if (error) {
    console.error('Error fetching role:', error);
    return null;
  }
  return data?.role || null;
}

// Wait for DOM to be ready before modifying elements
document.addEventListener('DOMContentLoaded', () => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    const authControls = document.getElementById('auth-controls');
    if (!authControls) return;

    if (session) {
      const user = session.user;
      const role = await getRole(user.id);

      authControls.innerHTML = `
        Logged in as ${user.email} (${role}) 
        <button onclick="logout()">Logout</button>
      `;

      if (role === 'organizer') {
        const btn = document.createElement('button');
        btn.innerText = 'Create Event';
        btn.onclick = () => window.location.href = 'create.html';
        authControls.appendChild(btn);
      }

    } else {
      authControls.innerHTML = `
        <button onclick="login()">Login</button>
      `;
    }
  });
});
