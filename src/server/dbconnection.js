require('dotenv').config();

const mysql = require('mysql');

const DB_USER = process.env.DB_USER;
const DB_PASS_PRODUCTS = process.env.DB_PASS_PRODUCTS;
const DB_PASS_USERS = process.env.DB_PASS_USERS;
const DB_NAME_USERS = process.env.DB_NAME_USERS;
const DB_NAME_PRODUCTS = process.env.DB_NAME_PRODUCTS;

export const usersConnection = mysql.createConnection({
  host: `/cloudsql/${process.env.DB_INSTANCE_USERS}`,
  user: DB_USER,
  password: DB_PASS_USERS,
  database: DB_NAME_USERS,
  socketPath: `/cloudsql/${process.env.DB_INSTANCE_USERS}`,
});

export const productsConnection = mysql.createConnection({
  host: `/cloudsql/${process.env.DB_INSTANCE_PRODUCTS}`,
  user: DB_USER,
  password: DB_PASS_PRODUCTS,
  database: DB_NAME_PRODUCTS,
  socketPath: `/cloudsql/${process.env.DB_INSTANCE_PRODUCTS}`,
});