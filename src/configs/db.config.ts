require("dotenv").config({ path: "../.env" });

export const database = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || 3306,
  database: process.env.DB_DATABASE,
};
