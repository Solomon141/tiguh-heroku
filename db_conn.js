const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "badregplccom_newp",
});

try {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
} catch (error) {
  console.log("Error connecting database: " + error)
}

module.exports = con;

// badregplccom_feb20;
