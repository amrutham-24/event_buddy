[![💻 Built at TinkerSpace](https://img.shields.io/badge/Built%20at-TinkerSpace-blueviolet?style=for-the-badge&label=%F0%9F%92%BBBuilt%20at&labelColor=turquoise&color=white)](https://tinkerhub.org/tinkerspace)
# 🎉 Kochi Event Buddy

Kochi Event Buddy is a lightweight, AI-first event discovery platform for college students and organizers. Built as a hackathon-ready, student-friendly web app, it allows organizers to create events and students to discover relevant events using a smooth, minimal UI powered by Supabase.

---

## 🚀 Objectives

The project was developed with the following goals:

- ✅ Build a role-based login system for **students** and **organizers**
- ✅ Store user information and roles in a Supabase `profiles` table
- ✅ Allow **organizers** to:
  - Sign up and identify their role
  - Log in and access a **"Create Event"** interface
- ✅ Allow **students** to:
  - Log in and (in future) view personalized events
- ✅ Make the platform **GitHub Pages** deployable and frontend-only using HTML + JS
- ✅ Ensure smooth user experience with dynamic DOM rendering (login state)

---

## ✅ Features Implemented

| Feature                             | Status     |
|------------------------------------|------------|
| Email/password login via Supabase | ✅ Complete |
| Role-based user signup (prompt)   | ✅ Complete |
| Organizer view with Create Event  | ✅ Complete |
| Profile data stored in Supabase   | ✅ Complete |
| GitHub Pages live deployment      | ✅ Complete |
| Student dashboard placeholder     | 🔜 In Progress |
| AI recommendations engine         | 🔜 Planned |

---

## 🧰 Tech Stack Used

### 💻 Frontend

- **HTML5**: For structure and layout
- **Vanilla JavaScript (ES6)**: Dynamic interactions, form handling, DOM updates
- **CSS**: Basic styling

### ☁️ Backend-as-a-Service

- **Supabase**:
  - **Auth**: Email/password authentication (`signUp`, `signInWithPassword`)
  - **Database**: PostgreSQL database for storing `profiles` and (later) `events`
  - **Row Level Security (RLS)** enabled
  - `profiles` table structure:
    | Column | Type    | Notes                   |
    |--------|---------|-------------------------|
    | id     | UUID    | Matches Supabase user ID |
    | email  | text    | User's email address     |
    | role   | text    | Either 'student' or 'organizer' |

### 🌍 Hosting

- **GitHub Pages**:
  - Free static web hosting for frontend
  - Git-based deployment for quick updates

---
👩‍💻 Made with ❤️ by Student Developers at CUSAT
This project was built as part of a campus initiative to improve event discoverability using web technologies and Supabase.

