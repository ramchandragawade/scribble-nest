# 🐣 Scribble Nest – A Full Stack MERN Scribble App

## 📝 Project Description

**Scribble Nest** is a sleek and feature-rich Full Stack application built using the **MERN stack** – **MongoDB**, **Express.js**, **React.js**, and **Node.js**. It enables users to securely create, manage, and organize personal scribbles with ease. The app includes secure authentication, an intuitive user interface, real-time editing capabilities, the ability to pin important scribbles, search functionality, and more.

Whether you're exploring full-stack development or looking to showcase a robust CRUD app with end-to-end functionality, **Scribble Nest** is an ideal project for your portfolio.

### Live Demo  
👉 [scribblenest.ramchandragawade.in](https://scribblenest.ramchandragawade.in)

---

## 🌟 Key Features

### 🔐 Authentication
- Login & Sign Up with password encryption and JWT-based session management
- Secure, user-specific access to scribbles
- Protected routes using `react-router-dom`

### ✍️ Scribble Management
- **Add Scribble:** Create new entries using a responsive modal
- **Edit Scribble:** Update content seamlessly with live UI refresh
- **Delete Scribble:** Remove entries when needed
- **Search Scribbles:** Real-time filtering using search bar
- **Pin Scribbles:** Prioritize important scribbles by pinning them
- **Tag Input:** Add tags to help organize and classify scribbles

### 🎨 User Interface
- Built with **React.js** and styled using **Tailwind CSS**
- Clean, modern, and responsive design
- Reusable modular components:
  - Login & Sign-Up Screens
  - Navigation Bar with Profile Info
  - Scribble Cards
  - Search Bar
  - Toast Notifications
  - Empty State View

### 🔧 Backend Functionality
- RESTful API built using **Express.js** and **Node.js**
- MongoDB used as the cloud database via **MongoDB Atlas**
- Mongoose for schema definition and data modeling
- JWT-based authentication for secure user sessions
- Core API Endpoints:
  - `POST /api/register` – Register new user
  - `POST /api/login` – Authenticate user
  - `GET /api/all-notes` – Get all scribbles
  - `POST /api/note` – Create new scribble
  - `PUT /api/note/:noteId` – Edit existing scribble
  - `DELETE /api//note/:noteId` – Delete scribble
  - `PUT /api/pinned-note/:noteId` – Pin/Unpin scribble
  - `GET /api/search-notes` – Search scribbles by keyword
  - `GET /api/user` – Get user profile data

---

## 💻 Technology Stack

### 🔙 Backend
- **Node.js** – JavaScript runtime for the server
- **Express.js** – Lightweight web framework
- **MongoDB Atlas** – NoSQL cloud database
- **Mongoose** – ODM for MongoDB
- **JWT** – Secure token-based authentication

### 🔜 Frontend
- **React.js** – UI library for building reusable components
- **react-router-dom** – SPA routing and navigation
- **Axios** – HTTP client for API communication
- **Tailwind CSS** – Utility-first CSS framework
- **Custom Components** – Includes input fields, popups, cards, toasts, etc.

---
## 📸 Screenshots

### 🏠 Login Page
![Login Page](https://github.com/user-attachments/assets/56d974d3-fc46-4d2a-9ba8-b4ae6d770680)
### 🏠 Register
![Register](https://github.com/user-attachments/assets/433e57cd-6880-4e6d-a380-9c5a2e5b1aa9)
### 🏠 Empty Home Page 
![Empty Home Page](https://github.com/user-attachments/assets/60fd5f98-564f-4a3b-9dcc-3b2d3f479d1d)
### 📝 Create New Scribble
![Create New Note](https://github.com/user-attachments/assets/e19b2087-55b5-4b1f-b79a-8e6e7dbf20bc)
### ✏️ Edit Existing Scribble  
![Edit/New Note](https://github.com/user-attachments/assets/8c28cb32-e4a5-4cc7-9d45-baff9d55ee3a)
### 📂 All Scribbles
![All Notes](https://github.com/user-attachments/assets/413452a2-01df-4f72-b563-501b11efddbd)
### 📌 Pinned & Unpinned Scribbles
![Pinned/Unpinned Notes](https://github.com/user-attachments/assets/66d03458-d272-4fff-9ab0-407c8b21cf6e)
### 🔍 Search Scribbles
![Search notes](https://github.com/user-attachments/assets/88637862-4a1d-4f25-ae97-cc2079ea136f)


## 📂 Get Started (Optional Setup Instructions)

> These steps can be added if you're planning to share the source code:

```bash
# Clone the repository
git clone https://github.com/your-username/scribble-nest.git
cd scribble-nest

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Setup environment variables
# Create a .env file in /backend with the following:
DB_URL=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret

# Create a .env file in /frontend with the following:
VITE_BACKEND_URL = url_of_server_with_port
e.g. VITE_BACKEND_URL = http://localhost:3002

# Run the application
npm run dev  # Or use concurrently to run both client and server
