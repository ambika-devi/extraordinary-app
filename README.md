🌟 Extraordinary App — React Authentication Demo

A simple Login → Signup → Dashboard application built using React + Apollo + GraphQL + Vite.

This project demonstrates secure authentication, role-based dashboard, and protected routes, making it ideal for interviews, portfolio, and learning purposes.

🔥 What This App Does

The app allows users to:

Sign up for an account

Log in using email/password

Get redirected to a personalized Dashboard based on their role (Admin / Employee)

Prevent unauthorized page access using protected routing

✨ Features
Feature	Description
🔐 Login Page	Allows users to log in with secure authentication
📝 Signup Page	Registers a new account and redirects to login
📊 Dashboard Page	Accessible only after login
🔁 Protected Routing	Blocks dashboard if user isn't logged in
👥 Role Based Access	Admin and Employee dashboards behave differently
💾 Persistent Session	Token & role stored in localStorage
⚡ GraphQL API	Apollo Client handles queries & mutations
🚀 Deploy Ready	Configured for GitHub Pages hosting
🔑 Demo Login Credentials 
| 🧑‍💼 **Role**     | 👤 **Username** | 🔐 **Password**   |
| ------------------ | --------------- | ----------------- |
| ⭐ **Admin**        | **`admin`**     | **`admin123`**    |
| 👨‍🔧 **Employee** | **`employee`**  | **`employee123`** |


🖼️ Screenshots (Optional)
Page	Description
Login Page	User authentication screen
Signup Page	New account registration
Dashboard	Role-based user dashboard

(Add screenshots later inside /screenshots folder if needed)

🛠️ Tech Stack
Technology	Used For
React 19	UI
Vite	Build tool
Apollo Client	GraphQL communication
GraphQL	API
React Router	Frontend routing
TailwindCSS	Styling
Framer Motion	Animation
📂 Folder Structure
src/
 ├─ apollo/          # Apollo client setup
 ├─ pages/           # Login, Signup, Dashboard
 ├─ components/      # Reusable UI components (if any)
 ├─ App.jsx          # Routing logic
 └─ main.jsx         # Entry point

🚀 Deployment

Live Demo: https://ambika-devi.github.io/extraordinary-app

To Run Locally
npm install
npm run dev

Build for Production
npm run build

Deploy to GitHub Pages
npm run deploy

👨‍💻 Purpose of This Project

This project was created to demonstrate:

Authentication flow in React apps

Protected and redirect-based routing

Working with an Apollo + GraphQL backend

Deploying a Vite React app to GitHub Pages
