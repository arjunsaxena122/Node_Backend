# Node_Backend

This npm package provides a comprehensive backend setup with multiple functionalities including server setup, models, middleware, validation, authentication, authorization, email services, and database management using MongoDB and Mongoose.

## Installation

```bash
    1.  git clone <https://github.com/arjunsaxena122/Node_Backend.git>
```
```bash
    2. cd Node_Backend
```
```bash
    3. npm install 
```
```bash
    4. PORT=3000
       MONGODB_URI=<your_mongodb_uri>
       JWT_SECRET=<your_jwt_secret>
       EMAIL_USER=<your_email_user>
       EMAIL_PASS=<your_email_password>
```


## Features

- **Server Setup:** Configured with Express.js
- **Models:** Structured using Mongoose
- **Middleware:** Custom middleware for various purposes
- **Validation:** Implemented using Zod
- **Authentication & Authorization:** Using JWT and bcrypt
- **Email Service:** Configured with Nodemailer
- **Database:** MongoDB with Mongoose integration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB installed and running on your machine or a cloud instance

## Folder Structure

`src/config/db.js`

This file contains the MongoDB connection setup using Mongoose.

`src/controllers/authController.js`

This file contains the logic for handling authentication-related requests.

`src/controllers/userController.js`

This file contains the logic for handling user-related requests.

`src/middlewares/authMiddleware.js`

This middleware handles authentication and authorization using JWT.

`src/middlewares/validationMiddleware.js`

This middleware handles request validation using Zod.

`src/middlewares/errorHandler.js`

This middleware handles errors and sends appropriate responses.

`src/models/userModel.js`

This file defines the User schema and model using Mongoose.

`src/routes/authRoutes.js`

This file defines the routes for authentication-related endpoints.

`src/routes/userRoutes.js`

This file defines the routes for user-related endpoints.

`src/services/emailService.js`

This file contains functions for sending emails using Nodemailer.

`src/services/authService.js`

This file contains functions for handling authentication logic.

`src/utils/jwt.js`

This file contains utility functions for generating and verifying JWT tokens.

`src/utils/bcrypt.js`

This file contains utility functions for hashing and comparing passwords using bcrypt.

`src/validations/userValidation.js`

This file contains validation schemas using Zod for user-related requests.

`src/app.js`

This is the main entry point of the application where the Express app is configured and started.


## Usage

##Start the server:

```bash
Copy code
1. npm start
```
```bash
Copy code
2. The server will run on the port specified in the .env file (default is 3000).
```
```bash
Copy code
3. Use an API client like Postman to test the endpoints.
```