# 🌿 The Wild Oasis — Client Booking App

**The Wild Oasis (Client App)** is a full-stack web application where travelers can **explore, book, and manage stays in nature-inspired cabins**.  
It’s built with **Next.js 15** for performance and SEO, and powered by **Supabase** for real-time data and authentication.  
The goal: deliver a modern, responsive, and seamless booking experience from browsing to check-out.

> “Your peaceful getaway begins here.” 🏡

---

## 🚀 Tech Stack

### 🖥️ Frontend
- ⚡ **Next.js 15 (React 19)** – App Router, SSR/ISR for fast and SEO-friendly pages  
- 🎨 **Tailwind CSS 4** – modern and responsive UI  
- 🔁 **React Query v5** – data fetching, caching, and optimistic updates  
- 💅 **Styled-Components** – custom component styling  
- 🔔 **React Hot Toast** – clean feedback for user actions  

### ⚙️ Backend / Database
- 🧠 **Supabase (PostgreSQL + Auth + Storage)** – serverless backend with real-time capabilities  
- 🔐 **Supabase Auth** – secure email sign up and sign in  
- ☁️ **Supabase Storage** – optimized image hosting for cabins and users  

---

## 🌄 Core Features

### 🏕️ Cabin Exploration
- Browse available cabins with images, pricing, and capacity  
- Filter by price, location, and availability  
- Server-rendered pages for instant loading and SEO  

### 📅 Booking System
- Book cabins directly with real-time Supabase sync  
- View and manage personal reservations  
- Prevents double-bookings with database constraints  

### 👤 User Accounts
- Sign up / Log in with email and password  
- Persistent sessions via Supabase Auth  
- View profile, booking history, and account details  

### 🔔 UX Enhancements
- Toast notifications for all key actions  
- Responsive mobile-first layout with optimized images  
- Smooth transitions and scroll behavior  

---

## ⚙️ Environment Variables (`.env`)

> ⚠️ Never push real credentials to GitHub. Use a safe `.env.example`.

```env
NEXT_PUBLIC_SUPABASE_URL=<your Supabase project URL>
NEXT_PUBLIC_SUPABASE_KEY=<your Supabase anon key>
NEXT_PUBLIC_BASE_URL=http://localhost:3000

