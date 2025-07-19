// login.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://zkjffgdvqjuoqxwaipaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // keep this safe
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

export async function getRole(userId) {
  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();
  if (data) return data.role;
  return null;
}

supabase.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    const user = session.user;
    const role = await getRole(user.id);

    document.getElementById('auth-controls').innerHTML = `
      Logged in as ${user.email} (${role}) 
      <button onclick="logout()">Logout</button>
    `;

    if (role === 'organizer') {
      const btn = document.createElement('button');
      btn.innerText = 'Create Event';
      btn.onclick = () => window.location.href = 'create.html';
      document.getElementById('auth-controls').appendChild(btn);
    }

  } else {
    document.getElementById('auth-controls').innerHTML = `
      <button onclick="login()">Login</button>
    `;
  }
});
