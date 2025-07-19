// login.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://zkjffgdvqjuoqxwaipaa.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sign in with Google
export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
  if (error) console.error('Login Error:', error);
}

// Sign out
export async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// Get role from profiles
export async function getRole(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (data) return data.role;
  return null;
}

// Ask user for role if not in profile
async function promptForRole(userId, email) {
  const role = prompt(`Welcome ${email}! Are you a "student" or "organizer"?`);

  if (role !== 'student' && role !== 'organizer') {
    alert('Invalid role. Defaulting to student.');
    return await supabase.from('profiles').upsert({ id: userId, email, role: 'student' });
  }

  return await supabase.from('profiles').upsert({ id: userId, email, role });
}

// Listen to auth changes
document.addEventListener('DOMContentLoaded', () => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    const authControls = document.getElementById('auth-controls');
    if (!authControls) return;

    if (session) {
      const user = session.user;
      let role = await getRole(user.id);

      // If no role, prompt user to choose one and save
      if (!role) {
        await promptForRole(user.id, user.email);
        role = await getRole(user.id); // fetch again
      }

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
