# Backend Web Task
This is the backend part of the MERN stack project. Follow the instructions below to set up and run the project.

## Prerequisites
Make sure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- MySQL

## Installation
1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd backend_web_task/backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables with your credentials:

    ```env
    PORT=5000
    DB_HOST="localhost"
    DB_USER="your_db_user"
    DB_PASSWORD="your_db_password"
    DB_NAME="user_management"
    JWT_SECRET="your_jwt_secret"
    ```

## Setting Admin Credentials

You can set your admin email and password in the `db.ts` file by modifying the following lines:

```typescript
const insertAdminQuery = `
    INSERT IGNORE INTO admin (email, password)
    VALUES ('your_admin_email@example.com', 'your_secure_password');
`;
```

Replace `'your_admin_email@example.com'` and `'your_secure_password'` with your desired admin email and password.


## Running the Project

1. Start the MySQL server if it's not already running:

    ```bash
    mysql.server start
    ```

2. Start the backend server:

    ```bash
    npm run dev
    ```

    The server should now be running on `http://localhost:5000`.

## API Endpoints

Here are some of the main API endpoints available in this project:

- `POST /api/users` - Create a new user (requires authentication)
- `PUT /api/users/:id` - Update a user by ID (requires authentication)
- `DELETE /api/users/:id` - Delete a user by ID (requires authentication)
- `GET /api/users` - Get all users (requires authentication)
- `GET /api/users/fetch` - Fetch and store users


## License

This project is licensed under the MIT License.

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Contact

For any inquiries, please contact [akshayyydabhade@gmail.com].
