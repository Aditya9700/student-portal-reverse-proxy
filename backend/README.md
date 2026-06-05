# Student Portal Backend API

This is a production-ready Student Portal Authentication API backend built using Node.js, Express.js, MongoDB, Mongoose, JWT, and bcryptjs.

It follows an industry-standard directory structure with centralized error handling, input validation middleware, and secure routing.

---

## Tech Stack
* **Runtime**: [Node.js](https://nodejs.org/) (v16+)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/) (ODM: [Mongoose](https://mongoosejs.com/))
* **Security**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) (Password Hashing), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (JWT Auth)
* **Configuration**: [dotenv](https://github.com/motdotla/dotenv)
* **CORS**: [cors](https://github.com/expressjs/cors)
* **Development**: [nodemon](https://nodemon.io/) (Auto Reloading)

---

## Directory Structure

```text
backend/
├── config/
│   └── db.js                 # Database Connection Utility
├── controllers/
│   └── authController.js     # Auth Business Logic Handler
├── middleware/
│   ├── authMiddleware.js     # JWT Token Verification Middleware
│   ├── errorMiddleware.js    # Centralized Error & 404 Handlers
│   └── validateMiddleware.js # Input Validation Rules Middleware
├── models/
│   └── User.js               # Mongoose User Schema Definition
├── routes/
│   └── authRoutes.js         # Express Routes mapping /api/auth/*
├── utils/
│   └── generateToken.js      # JWT Token Sign Helper
├── .env.example              # Template for environment configuration
├── server.js                 # App Entry Point & Server Hookup
├── package.json              # Project dependencies & scripts
└── README.md                 # Project documentation
```

---

## Installation & Setup

1. **Clone or Navigate to the Backend Folder**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file and name it `.env`:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and set your configurations:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/student_portal?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```
   *Note: If using MongoDB locally, set `MONGO_URI=mongodb://127.0.0.1:27017/student_portal`.*

---

## Running the Application

### Development Mode (with hot reloading)
Runs the server utilizing `nodemon` to watch for any changes:
```bash
npm run dev
```

### Production Mode
Launches the server with standard `node`:
```bash
npm start
```

Once started, the backend server will be listening at: `http://localhost:5000`

---

## API Endpoints Documentation

### 1. Register User
Creates a new user profile. Validates fields and checks for duplicate emails.

* **URL**: `/api/auth/register`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Example Response (Success - 201 Created):
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Example Response (Duplicate Email - 400 Bad Request):
```json
{
  "success": false,
  "message": "User already registered with this email address"
}
```

#### Example Response (Validation Failure - 400 Bad Request):
```json
{
  "success": false,
  "message": "Password must be at least 6 characters long"
}
```

---

### 2. Login User
Authenticates user using email and password. Generates and returns a JWT token.

* **URL**: `/api/auth/login`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Example Response (Success - 200 OK):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWZj...",
  "user": {
    "id": "665fcfeb1d0fa43a903cdebe",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Example Response (Authentication Failure - 401 Unauthorized):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Get User Profile (Protected)
Retrieves the logged-in user profile info. Requires a valid JWT token.

* **URL**: `/api/auth/profile`
* **Method**: `GET`
* **Headers**: `Authorization: Bearer <your_jwt_token_here>`

#### Example Response (Success - 200 OK):
```json
{
  "success": true,
  "user": {
    "id": "665fcfeb1d0fa43a903cdebe",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Example Response (Unauthorized - 401 Unauthorized):
```json
{
  "success": false,
  "message": "Not authorized, token validation failed"
}
```

---

## Error Handling Specifications
All errors are returned in a unified format:
```json
{
  "success": false,
  "message": "<Detailed Error Message>"
}
```
* **400 Bad Request**: Raised during validation errors (e.g. missing inputs, invalid email string, password length too short, duplicate resource keys).
* **401 Unauthorized**: Raised when token is expired, tampered, missing, or credentials do not match.
* **404 Not Found**: Raised when hitting endpoints that do not exist.
* **500 Internal Server Error**: General catch-all for system/server level exceptions.
