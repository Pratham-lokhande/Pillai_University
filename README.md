
# Student management system

Build a Student Management System to develop a full-stack application using frontend, backend, and database technologies.


<img width="1918" height="1078" alt="Dashboard" src="https://github.com/user-attachments/assets/c34e6e9b-b0a8-4c33-9a53-72c6b8e75ec4" />
<img width="1918" height="1078" alt="New Updates" src="https://github.com/user-attachments/assets/4a11acf1-01e3-4622-8778-9aebc41f82c1" />
<img width="1918" height="1078" alt="Student Profile" src="https://github.com/user-attachments/assets/21c960c7-54c0-4db7-bbce-a2cb3aa0691c" />
<img width="1918" height="1078" alt="Database" src="https://github.com/user-attachments/assets/63dd1ad1-9400-4f05-ab5c-04c13cb88d77" />
<img width="1918" height="1078" alt="Admit New student" src="https://github.com/user-attachments/assets/a262d301-5240-412b-96e1-7b3603cae7ae" />

Here is a concise, GitHub-ready `README.md` template for your Student Management System. You can copy and paste this directly into your repository.

---

# Student Management System

A full-stack application for managing student records, courses, and enrollments.

## 🧰 Technologies Used

* **Frontend:** React (with Axios & Tailwind CSS)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (with Sequelize ORM / pg pool)
* **Authentication:** JSON Web Tokens (JWT)

---

## 🚀 Setup Instructions

### Prerequisites

* Node.js (v18+)
* PostgreSQL (v14+)

### 1. Database Setup

1. Open PostgreSQL and create a database:
```sql
CREATE DATABASE student_management;

```



### 2. Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root of the `backend` folder:
```env
PORT=5000
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=student_management
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_key

```


4. Start the server: `npm run dev` (or `node server.js`)

### 3. Frontend Setup

1. Navigate to the frontend directory: `cd ../frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open `http://localhost:3000` in your browser.

---

## 🔌 API Endpoints

### Authentication

* `POST /api/auth/register` - Register a new user/admin
* `POST /api/auth/login` - Login and receive JWT token

### Students

* `GET /api/students` - Get all students *(Protected)*
* `GET /api/students/:id` - Get a specific student's details
* `POST /api/students` - Add a new student *(Protected)*
* `PUT /api/students/:id` - Update student details *(Protected)*
* `DELETE /api/students/:id` - Delete a student *(Protected)*

### Courses

* `GET /api/courses` - List all courses
* `POST /api/courses` - Create a new course *(Protected)*
