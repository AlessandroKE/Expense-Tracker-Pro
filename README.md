# Expense Tracker Pro API

**Expense Tracker Pro API** is a RESTful API designed to manage and track expenses and income for users. This API provides endpoints to handle user authentication, expense management, and financial tracking, enabling integration with various front-end applications or services.

## Features

- **User Authentication:** Secure sign-up and login endpoints for user management.
- **Expense Management:** Endpoints to add, update, delete, and retrieve expenses.
- **Income Tracking:** Endpoints to manage and track sources of income.
- **Balance Calculation:** Automatically update and retrieve balance based on transactions.
- **Expense Categories:** Organize and categorize expenses for better management.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose for object modeling)
  - JWT (JSON Web Tokens) for authentication

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or cloud service)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AlessandroKE/Expense-Tracker-Pro.git
    cd Expense-Tracker-Pro
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory of the project and add the following variables:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=3000
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    The API server will be running on `http://localhost:3000`.

### API Endpoints

#### Authentication

- **POST /api/auth/register**
  - Register a new user.
  - **Request Body:** `{ "username": "string", "password": "string" }`
  - **Response:** `201 Created` on success, `400 Bad Request` on validation errors.

- **POST /api/auth/login**
  - Log in an existing user.
  - **Request Body:** `{ "username": "string", "password": "string" }`
  - **Response:** `200 OK` with a JWT token on success, `401 Unauthorized` on failure.

#### Expenses

- **GET /api/expenses**
  - Retrieve a list of all expenses for the authenticated user.
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `200 OK` with a list of expenses.

- **POST /api/expenses**
  - Add a new expense.
  - **Request Body:** `{ "amount": "number", "remarks": "string", "category": "string" }`
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `201 Created` with the new expense object.

- **PUT /api/expenses/:id**
  - Update an existing expense.
  - **Request Body:** `{ "amount": "number", "remarks": "string", "category": "string" }`
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `200 OK` with the updated expense object.

- **DELETE /api/expenses/:id**
  - Delete an expense.
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `204 No Content` on success.

#### Income

- **GET /api/income**
  - Retrieve a list of all income entries for the authenticated user.
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `200 OK` with a list of income entries.

- **POST /api/income**
  - Add a new income entry.
  - **Request Body:** `{ "amount": "number", "source": "string", "remarks": "string" }`
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `201 Created` with the new income object.

### Usage

1. **Register and Log in:** Use the authentication endpoints to create an account and obtain a JWT token.
2. **Manage Expenses and Income:** Use the provided API endpoints to add, update, and retrieve expenses and income.
3. **Authenticate Requests:** Include the JWT token in the `Authorization` header for protected endpoints.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.
