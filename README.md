# CONGREGATE: Church Attendance Tracker Web App

## Project Overview
This capstone project builds a mobile-optimized web app for a church to track Sunday service attendance. This document reflects the project's state after a series of development and debugging sessions with an AI assistant.

## Technologies Used

The final tech stack was solidified as follows:

- **Frontend**: Next.js (React)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize (Replaced Prisma)
- **Authentication**: JWT with Passport.js
- **Styling**: Tailwind CSS
- **Development**: `concurrently` to run frontend and backend servers.

## Features Implemented

The following features have been built and configured on the backend:

1.  **Database Setup with Sequelize**:
    - Replaced the initial Prisma setup with Sequelize.
    - Generated models for `Members` and `Attendance`.
    - Created a database migration to add `gender` and `demographic` columns to the `members` table and create the `attendance` table.

2.  **User Authentication and RBAC**:
    - Full JWT-based authentication system using Passport.js.
    - A `POST /api/auth/login` endpoint that issues a token for hardcoded users (`admin`/`worker`).
    - `protect` middleware to secure routes, requiring a valid JWT.
    - `isAdmin` middleware for role-based access control.

3.  **Member and Attendance APIs**:
    - All endpoints are protected and require authentication.
    - `GET /api/members`: Fetches a list of members with powerful filtering options:
        - Filter by `gender` (`M`, `F`, `Other`).
        - Filter by `demographic` (`Y`, `M`, `W`).
        - Search by `firstName` or `lastName`.
        - Sort by `lastName` (`ASC` or `DESC`).
    - `POST /api/attendance`: Creates a new attendance record and prevents duplicate entries for the same member on the same date.
    - `GET /api/attendance/:memberId`: Retrieves all attendance records for a specific member.

## Setup and Run Instructions

1.  **Clone the repository**.

2.  **Install Dependencies**:
    ```bash
    # In the root directory
    npm install

    # In the /backend directory
    cd backend
    npm install

    # In the /frontend directory
    cd ../frontend
    npm install
    ```

3.  **Setup Environment Variables**:
    - In the project root, create a `.env` file.
    - Add your PostgreSQL database connection string and a JWT secret:
      ```
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
      JWT_SECRET="your_super_secret_key_here"
      ```

4.  **Run Database Migrations**:
    - Navigate to the backend directory: `cd backend`
    - Run the following command to apply the database schema changes:
      ```bash
      npx sequelize-cli db:migrate --config config/config.cjs --models-path models --migrations-path migrations
      ```

5.  **Run the Application**:
    - From the project root directory, run the development script:
      ```bash
      npm run dev
      ```
    - This will start both the frontend (on `http://localhost:3000`) and the backend (on `http://localhost:5001` or your specified port) concurrently.

## Notes on AI Usage

An AI assistant (Gemini) was used extensively throughout the backend development process. Key interactions included:

-   **Initial Scaffolding**: Generating the initial Sequelize models (`Members`, `Attendance`) and a complex database migration file.
-   **Feature Implementation**: Creating the complete Passport.js and JWT authentication system, including the login route, JWT signing, and the `passport-jwt` strategy.
-   **API Generation**: Building the Express router for the members and attendance APIs, including the database query logic for filtering and sorting.
-   **Debugging and Refactoring**: This was the most critical area of AI assistance. The AI helped diagnose and solve a series of complex issues:
    -   **Module Incompatibility**: Repeatedly fixing `ReferenceError: require is not defined` and `SyntaxError: The requested module does not provide an export named 'default'` by refactoring files to be ESM-compatible or renaming them to `.cjs`.
    -   **Configuration Issues**: Debugging `sequelize-cli` failures by creating `.sequelizerc` and `config.cjs` files.
    -   **Database Connectivity**: Troubleshooting silent and explicit database connection errors, such as the `connection is insecure (sslmode=require)` error, by modifying the database configuration.
    -   **Runtime Errors**: Diagnosing unexpected `403 Forbidden` errors by isolating the cause to CORS policy and environmental issues.
-   **Code Correction**: The AI was able to analyze error logs, form hypotheses, and apply fixes by reading and rewriting broken code files.