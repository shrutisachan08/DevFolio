# DevFolio – Developer Portfolio & Project Showcase Platform

DevFolio is a full-stack web application that enables developers to dynamically manage and showcase their projects through a secure admin dashboard. It is designed to function as a personal portfolio system with real-time updates, structured project display, and basic user engagement tracking.

---

## ✨ Features

- **Aesthetic & Responsive Landing Page**  
  Clean UI with smooth animations for better user experience

- **Dynamic Project Showcase**  
  Projects are fetched and rendered dynamically from the database

- **Project Detail Pages**  
  Dedicated pages for each project with detailed information

-  **Admin Dashboard (CRUD Operations)**  
  Add, edit, and delete projects through a protected interface

-  **Authentication System**  
  Secure admin access using JWT-based authentication

- **Image Upload Support**  
  Upload and manage project images

- **Basic Analytics**  
  Tracks project views and user clicks for engagement insights

---

## Project Structure

```
devfolio/
│── frontend/    # React application (UI)
│── backend/     # Node.js + Express server (APIs)
```

---

## Backend Overview

The backend is built using Express and handles:

- Authentication and authorization  
- Project management operations (CRUD)  
- Handling image uploads  
- Tracking analytics (views & clicks)  
- Connecting with MongoDB database  

---

## Tech Stack

### **Frontend**
- React.js  
- SCSS / CSS Modules  
- Framer Motion  

### **Backend**
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  

---

## Core Functional Flow

1. Admin logs in using secure authentication  
2. Admin manages projects via dashboard (Create/Update/Delete)  
3. Projects are stored in MongoDB  
4. Frontend fetches and displays projects dynamically  
5. User interactions (views/clicks) are tracked and stored  

---

## Getting Started

### Prerequisites
- Node.js installed  
- MongoDB (local setup or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devfolio.git

# Navigate to project folder
cd devfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Project

```bash
# Start backend server
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start
```

---

## Environment Variables

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=you_secret_key
```

---

##  Future Improvements

-  Deploy on cloud platforms for public access  
-  Advanced analytics dashboard  
-  Search and filtering for projects  
-  Multi-user portfolio support  

---

## Key Highlights

- Full-stack implementation with clear separation of frontend and backend  
- Secure admin system using JWT  
- Dynamic data-driven UI  
- Practical real-world use case (developer portfolio system)  

---

## Author

**Shruti Sachan**