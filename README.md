# Student Portal with Nginx Reverse Proxy

A Student Portal Web Application built using the MERN stack (MongoDB, Express.js, React, Node.js) with JWT Authentication and Nginx Reverse Proxy integration.

Assignment -4
Web Technology  by Aditya Rana

## Project Overview

This project demonstrates a secure web application that allows users to:

* Register an account
* Login using JWT authentication
* Access a protected dashboard
* View user profile information
* Logout securely

The application uses Nginx as a Reverse Proxy to route client requests to the appropriate services while hiding backend implementation details.

---

## Technologies Used

### Frontend

* React
* Vite
* React Router
* Bootstrap 5

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication

### Reverse Proxy

* Nginx

---

## System Architecture

```text
                    User
                      |
                      v
              Nginx Reverse Proxy
                      |
          -------------------------
          |                       |
          v                       v
    React Frontend         Express Backend
                                  |
                                  v
                             MongoDB Atlas
```

---

## Features

### Authentication


### Student Portal

* Dashboard Page
* User Profile Page

### Reverse Proxy

* Nginx serves the React frontend
* API requests routed through Nginx
* Backend ports hidden from users
* Centralized request handling

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-portal-nginx-reverse-proxy.git
cd student-portal-nginx-reverse-proxy
```

### 2. Configure Backend

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Configure Frontend

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

Build the React application:

```bash
npm run build
```

Copy the contents of the generated `dist` folder into the Nginx `html` directory.

### 4. Start Nginx

Run or reload Nginx:

```bash
nginx -s reload
```

### 5. Access the Application

Open:

```text
http://localhost
```

The React frontend will be served by Nginx, and all API requests will be forwarded to the Express backend through the reverse proxy.
