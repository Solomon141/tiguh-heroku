const express = require("express");
const router = express.Router();

const con = require("../db_conn");

router.get("/", function (req, res, next) {
  res.send("sol in lookup");
});

router.get("/save", function (req, res, next) {
  var sql =
    "INSERT INTO `tblSample`(`name`,`email`) VALUES ('Solomon', 'weymit2001@gmail.com')";
  con.query(sql, function (err, data) {
    if (err) throw err;
    console.log("Data inserted");
  });
});

router.get("/getall", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/getone", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/update", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});

router.get("/delete", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});

// Get Specific
router.get("/getRoles", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup` WHERE `parent` = 4";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/getSalesType", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup` WHERE `parent` = 5";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/getSellerCompany", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup` WHERE `parent` = 8";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/getSpeciality", function (req, res, next) {
  var sql_get = "SELECT * FROM `lookup` WHERE `parent` = 2";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
