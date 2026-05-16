# skill-gap-analyze
# Skill Gap Analysis System

## Project Overview
The Skill Gap Analysis System is a web-based application developed to identify the gap between the skills required for a particular job role and the skills possessed by users. This system helps users understand missing skills and improve their career readiness.

This project was developed for the module:

**Web Services and Technology (IT2234)**

---

# Problem Description

Many students and job seekers struggle to identify whether their current skills match industry requirements. Without proper guidance, users may not know which skills they need to improve for a specific role.

This system helps solve that problem by:
- Managing job roles and required skills
- Managing user skills
- Comparing user skills with role requirements
- Generating skill gap analysis results

---

# Proposed Solution

The proposed solution is a RESTful API-based system developed using Node.js, Express.js, and MongoDB.

The system allows:
- Admins to manage roles and required skills
- Users to manage their skills
- The system to analyze skill gaps automatically

---

# Features

## Backend Features
- RESTful API architecture
- CRUD operations for users and roles
- MongoDB database integration
- Skill gap analysis functionality
- Error handling and validation
- Admin-only route protection

## Frontend Features (Optional Enhancement)
- React.js frontend
- Modern UI using Vite
- API integration with backend
- User-friendly interface

---

# Technologies Used

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

## Frontend
- React.js
- Vite
- JavaScript
- CSS

## Tools
- Postman
- GitHub
- VS Code

---

# Folder Structure

```bash
skill-gap-analyze/
│
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# API Endpoints

## User Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /api/user/create | Create new user |
| GET | /api/user/get | Get all users |
| PUT | /api/user/update/:id | Update user |
| DELETE | /api/user/delete/:id | Delete user |

---

## Role Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /api/role/create | Create role |
| GET | /api/role/get | Get all roles |
| PUT | /api/role/update/:id | Update role |
| DELETE | /api/role/delete/:id | Delete role |

---

# Example Request

## Create User

```json
POST /api/user/create

{
  "name": "John",
  "skills": ["JavaScript", "React"]
}
```

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Dasun-Gunasekara/skill-gap-analyze.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

---

# How to Run the Project

## Start Backend

```bash
npm start
```

Backend runs on:
```bash
http://localhost:8000
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:
```bash
http://localhost:5173
```

---

# API Testing

All API endpoints were tested using Postman.

Postman was used to:
- Test CRUD operations
- Verify API responses
- Validate error handling

---

# GitHub Repository

Repository Link:
https://github.com/Dasun-Gunasekara/skill-gap-analyze

---

# Future Improvements

- Authentication and Authorization
- JWT Security
- Dashboard Analytics
- AI-based Skill Recommendations
- Resume Upload Feature

---

# Conclusion

The Skill Gap Analysis System helps users identify missing skills required for specific job roles. This project demonstrates RESTful API development, MongoDB integration, CRUD operations, frontend integration, and proper project structuring using modern web technologies.

---

# Author

Dasun Gunasekara
