const mysql = require('mysql');

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME_USERS = process.env.DB_NAME_USERS;
const DB_NAME_PRODUCTS = process.env.DB_NAME_PRODUCTS;

const usersConnection = mysql.createConnection({
  host: `/cloudsql/${process.env.DB_INSTANCE_USERS}`,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME_USERS,
  socketPath: `/cloudsql/${process.env.DB_INSTANCE_USERS}`,
});

const productsConnection = mysql.createConnection({
  host: `/cloudsql/${process.env.DB_INSTANCE_PRODUCTS}`,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME_PRODUCTS,
  socketPath: `/cloudsql/${process.env.DB_INSTANCE_PRODUCTS}`,
});