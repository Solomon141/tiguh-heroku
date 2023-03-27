const express = require("express");
const router = express.Router();
const con = require("../../db_conn");
var func = require("../../Collection/Nested_main");

router.get("/allproducts", function (req, res, next) {
  var sql_get = "SELECT * FROM `tblproduct`";
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/company_product", function (req, res, next) {
  var sql =
    "SELECT * FROM `lookup` LEFT JOIN `tblproduct` ON `tblproduct`.`Brand_ID` = `lookup`.`ID` WHERE `lookup`.`parent` = 1;";
  //Key relations, Define each table's primary and foreign keys
  var nestingOptions = [
    {
      tableName: "lookup",
      pkey: "ID",
    },
    {
      tableName: "tblproduct",
      pkey: "ID",
      fkeys: [{ table: "lookup", col: "Brand_ID" }],
    },
  ];

  con.query({ sql: sql, nestTables: true }, function (err, rows) {
    // error handling
    if (err) {
      console.log("Internal error: ", err);
      res.send("Mysql query execution error!");
    } else {
      var nestedRows = func.convertToNested(rows, nestingOptions);
      // res.send(JSON.stringify(nestedRows));
      res.send(nestedRows);
    }
  });
});

router.get("/lookuptype_lookup", function (req, res) {
  var sql =
    "SELECT * FROM `lookup_type` LEFT JOIN `lookup` ON `lookup_type`.`ID` = `lookup`.`parent`";
  //Key relations, Define each table's primary and foreign keys
  var nestingOptions = [
    {
      tableName: "lookup_type",
      pkey: "ID",
    },
    {
      tableName: "lookup",
      pkey: "ID",
      fkeys: [{ table: "lookup_type", col: "parent" }],
    },
  ];

  con.query({ sql: sql, nestTables: true }, function (err, rows) {
    // error handling
    if (err) {
      console.log("Internal error: ", err);
      res.send("Mysql query execution error!");
    } else {
      var nestedRows = func.convertToNested(rows, nestingOptions);
      // res.send(JSON.stringify(nestedRows));
      res.send(nestedRows);
    }
  });
});

module.exports = router;
