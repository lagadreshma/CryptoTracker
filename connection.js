const mysql = require("mysql");

require("dotenv").config();

var con = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.getConnection((err) => {
    if (err) throw console.log(err);
    console.log("Database Connected Successfully");
});

module.exports = con;