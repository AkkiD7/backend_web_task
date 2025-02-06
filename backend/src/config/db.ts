import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createDatabaseAndTables = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
    console.log(`Database '${process.env.DB_NAME}' created or already exists.`);
    connection.end();

    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        profile_image VARCHAR(800)
      );
    `;

    const createAdminTableQuery = `
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;

    const tableConnection = await pool.getConnection();
    await tableConnection.query(createUsersTableQuery);
    console.log("'users' table created or already exists.");

    await tableConnection.query(createAdminTableQuery);
    console.log("'admin' table created or already exists.");

    const insertAdminQuery = `
      INSERT IGNORE INTO admin (email, password)
      VALUES ('admin@gmail.com', 'admin@123');
    `;
    await tableConnection.query(insertAdminQuery);
    // console.log("Admin record inserted or already exists.");

    tableConnection.release();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error setting up the database:", error.message);
    } else {
      console.error("Unknown error occurred while setting up the database.");
    }
    process.exit(1);
  }
};

(async () => {
  await createDatabaseAndTables();
})();

export default pool;
