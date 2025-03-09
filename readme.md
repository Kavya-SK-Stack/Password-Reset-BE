# Backend - MyApp
##  Project Overview
- This is the Backend part of MyApp — a user authentication and account management system built using Node.js, Express.js, JWT (JSON Web Tokens), MongoDB, and Mongoose.

- The backend handles user authentication, password reset flow, and API endpoints for login, signup, and password management.

##  Technologies Used
- Node.js: JavaScript runtime used for the server-side application.
- Express.js: A web application framework for Node.js to handle HTTP requests and routing.
- MongoDB: NoSQL database for storing user data securely.
- Mongoose: MongoDB object modeling tool to interact with the database.
- JWT: JSON Web Tokens for user authentication and authorization.
- Bcrypt.js: A library for hashing passwords securely.
- Nodemon: A tool to automatically restart the server during development.
- Cors: Middleware to enable Cross-Origin Resource Sharing for frontend-backend communication.
- dotenv: Loads environment variables from a .env file into process.env.
##  Installation & Setup

1. Install Dependencies
Make sure you have Node.js and npm installed. Then, run the following command to install project dependencies:

bash
Copy code
npm install
3. Environment Configuration
Create a .env file in the root directory of the project.

Add the following environment variables (make sure to replace with your own values):

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
PORT: Port number where the server will run.
MONGO_URI: MongoDB connection string.
JWT_SECRET: Secret key for signing JWT tokens.
EMAIL_USER & EMAIL_PASS: Email credentials for sending email verification and password reset links.
```
1. Start the Development Server
Run the following command to start the application:

bash
Copy code
npm run dev
This will start the server using Nodemon to automatically restart on code changes.

Visit http://localhost:3001 to access the backend.

##  Authentication Flow
- Sign Up: A user can register with a username, email, and password. The password is hashed using bcrypt.
- Log In: After registration, users can log in with their credentials. A JWT token is generated upon successful login.
- Forgot Password: If a user forgets their password, they can request a reset. An email with a reset token is sent, and the user can set a new password.
- JWT Authentication: For secured routes (like the dashboard), the user must provide a valid JWT token.
 Email Configuration
- The application uses Nodemailer to send emails for actions like account verification and password reset.



##  Testing the API
Once the server is running, here are the common routes you can test:

POST /auth/signup: Sign up a new user. Requires { username, email, password } in the request body.
POST /auth/login: Log in a user. Requires { email, password } in the request body.
POST /auth/reset-password: Send a password reset email to the user. Requires { email } in the request body.
POST /auth/new-password/:token: Reset the password using the token received in the email. Requires { password } in the request body.
GET /user/profile: Get the user's profile information (requires a valid JWT token).


##  Contributing
Contributions are welcome! To contribute, please fork this repository, make your changes, and submit a pull request.


##  Future Improvements
- Add email verification for new users.
- Improve security features like rate-limiting and logging.
- Support additional user management features (e.g., update profile).