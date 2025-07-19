// login.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://zkjffgdvqjuoqxwaipaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Use your full anon key here

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Login with email and password
export async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Login failed: ' + error.message);
    console.error(error);
    return;
  }

  location.reload(); // reload to trigger auth state change listener
}

// Signup with email and password
export async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert('Signup failed: ' + error.message);
    console.error(error);
  } else {
    alert('Signup successful! Please check your email to confirm.');
  }
}

// Logout user
export async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// Get role from profiles table
export async function getRole(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) console.error('Error fetching role:', error);

  return data ? data.role : null;
}

// Prompt user for role and save to Supabase
async function promptForRole(userId, email) {
  const role = prompt(`Welcome ${email}! Are you a "student" or "organizer"?`);

  const finalRole = (role === 'student' || role === 'organizer') ? role : 'student';

  const { error } = await supabase.from('profiles').upsert({
    id: userId,
    email,
    role: finalRole
  });

  if (error) {
    console.error('Failed to save role:', error);
  }

  return finalRole;
}

// Listen for auth state changes
document.addEventListener('DOMContentLoaded', () => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    handleAuthState(session);
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    handleAuthState(session);
  });
});

// Handle UI updates based on login state
async function handleAuthState(session) {
  const authControls = document.getElementById('auth-controls');
  if (!authControls) return;

  if (session) {
    const user = session.user;
    let role = await getRole(user.id);

    if (!role) {
      role = await promptForRole(user.id, user.email);
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

    if (role === 'student') {
      const btn = document.createElement('button');
      btn.innerText = 'View Events';
      btn.onclick = () => window.location.href = 'student-dashboard.html';
      authControls.appendChild(btn);
    }

  } else {
    authControls.innerHTML = `
      <input type="email" id="email" placeholder="Email" />
      <input type="password" id="password" placeholder="Password" />
      <button onclick="login()">Login</button>
      <button onclick="signup()">Sign Up</button>
    `;
  }
}
