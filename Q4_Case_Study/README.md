# Student Management System - Full-Stack Web Application

**Course:** Web Application Architecture & Cloud Deployment / Full-Stack Web Development  
**Student Roll Number:** A24126552078  
**Allocated Question:** Question 4 (Q4)  
**Task Description:** Write MongoDB queries to perform the following operations on a students collection:
- (a) Insert a student record
- (b) Retrieve all student records
- (c) Update a student's department
- (d) Delete a student record

---

## 20-Mark Evaluation Rubric Mapping

| S.No | Rubric Component | Marks | Implementation in Project |
|------|------------------|-------|---------------------------|
| 1 | Problem Understanding & System Design | 2 | Requirement specifications, 3-tier architecture (React + Express + MongoDB Atlas), RESTful workflow |
| 2 | MongoDB Database Design | 3 | Document schema design, data types, validation, index strategy |
| 3 | CRUD Operations (Q4 a, b, c, d) | 4 | Implemented in `database/queries.mongodb.js` and Express routes (`/api/students`) |
| 4 | Aggregation & Indexing | 3 | `$group` aggregation pipeline for department stats; unique index on `rollNo`, index on `department` |
| 5 | React Frontend Development | 2 | Vite + React responsive UI, stats cards, CRUD forms, department updater, reactive table |
| 6 | Express.js Backend Development | 2 | RESTful API routes (`POST`, `GET`, `PUT`, `PATCH`, `DELETE`), CORS middleware, error handlers |
| 7 | Cloud Deployment | 2 | MongoDB Atlas cluster configuration, Render backend service, Vercel frontend hosting |
| 8 | Testing & Documentation | 2 | 6 comprehensive test cases (TC1-TC6), cURL commands, execution logs, and PDF report |
| **Total** | | **20** | |

---

## Project Structure

```
student-management-system/
├── backend/
│   ├── .env.example            # Environment variables template
│   ├── package.json            # Node.js dependencies (express, mongoose, cors, dotenv)
│   └── server.js               # Express server, MongoDB connection, REST API endpoints
├── frontend/
│   ├── .env.example            # Frontend environment variable (VITE_API_URL)
│   ├── index.html              # HTML entry point
│   ├── package.json            # React + Vite dependencies
│   ├── vite.config.js          # Vite build configuration
│   └── src/
│       ├── App.jsx             # Main interactive dashboard component
│       ├── main.jsx            # React root mount
│       └── style.css           # Clean modern CSS styling
├── database/
│   └── queries.mongodb.js      # MongoDB Shell scripts for Q4 (Insert, Read, Update, Delete) + Aggregation
└── README.md                   # Complete documentation
```

---

## Quick Start Guide

### 1. Database Operations (mongosh)
Open MongoDB Compass or execute via terminal:
```bash
mongosh <connection-string> database/queries.mongodb.js
```

### 2. Run Backend Locally
```bash
cd backend
npm install
# Configure your .env with your MONGODB_URI
npm start
```
The backend starts on `http://localhost:5000`. Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

### 3. Run Frontend Locally
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
