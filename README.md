# SynapseLearn 🧠

[![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-orange?logo=clerk)](https://clerk.com/)
[![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-4B3265?logo=drizzle)](https://orm.drizzle.team/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![ShadCN UI](https://img.shields.io/badge/UI-ShadCN-18181B)](https://ui.shadcn.com/)
[![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-336791?logo=postgresql)](https://www.postgresql.org/)
[![Neon](https://img.shields.io/badge/Cloud-Neon-00E599?logo=neon)](https://neon.tech/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini-4285F4?logo=google)](https://aistudio.google.com/app/apikey)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/93f143f2-1802-4268-b3d9-f1d9123e5fc1/deploy-status)](https://app.netlify.com/projects/synapse-learn/deploys)

---

## 🚀 Project Description

**SynapseLearn** is an AI-powered learning platform that helps users master any topic through actionable, auto-generated tasks. Enter a topic like “Learn React”, and SynapseLearn uses Google Gemini to generate 5 beginner-friendly tasks. Users can track, edit, re-generate, and complete tasks to structure their learning journey.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Auth:** [Clerk](https://clerk.com/)
- **UI:** [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
- **Database:** PostgreSQL via [Neon](https://neon.tech/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **AI API:** [Google Gemini](https://aistudio.google.com/app/apikey)
- **Deployment:** [Netlify](https://netlify.com/)

---

## ✨ Features

- 🔐 User sign-up and authentication via Clerk
- 🤖 Generate 5 actionable tasks from any topic using Gemini
- 💾 Save, Edit, and Delete tasks (CRUD)
- ✅ Mark tasks as completed
- 🔄 Re-generate tasks for the same topic
- 🔍 Filter tasks by status (Completed / Incomplete / All)
- 📊 Analytics: track your total topics, tasks, and progress
- 📱 Fully responsive, accessible UI with modern ShadCN components

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/synapselearn.git
cd synapselearn
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Fill in `.env`:

```env
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
DATABASE_URL=postgres://user:password@host:port/dbname
GEMINI_API_KEY=your-google-gemini-api-key
```

> 🔐 You can get your keys from:
>
> * [Clerk Dashboard](https://dashboard.clerk.com/)
> * [Neon](https://neon.tech/)
> * [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. Run the Dev Server

```bash
npm run dev
# or
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

### ✅ Deploy on Netlify

1. Push your code to GitHub.
2. Import your GitHub repo into [Netlify](https://netlify.com/new).
3. Set up your environment variables in Netlify dashboard.
4. Click **Deploy** and you're live!

---

## 🌐 Live Demo

* 🔗 **Live URL:** [SynapseLearn](https://synapse-learn.netlify.app/)
* 📽️ **Loom Walkthrough:** [View Demo](https://www.loom.com/share/e6af3c2a5e454ca89dfedde05aba084b?sid=e5685c77-ddfd-4797-b9cf-b63ba6fe0932)

---

## 🧪 Sample Task Output

> **Input Topic:** `Learn Git`

```json
[
  { "title": "Install Git and set up your GitHub account" },
  { "title": "Initialize a new Git repository" },
  { "title": "Learn Git status, add, commit, and log commands" },
  { "title": "Create and merge branches" },
  { "title": "Push code to GitHub and clone a repo" }
]
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ using Next.js, Clerk, Drizzle, ShadCN, and Gemini.
