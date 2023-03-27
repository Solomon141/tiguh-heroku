const express = require("express");
const router = express.Router();

const con = require("../db_conn");

router.get("/allproducts", function (req, res, next) {
  res.send("all products");
});

router.post("/productByCat/:catID", function (req, res, next) {
  let catID = req.params.catID;

  var sql_get = `SELECT * FROM casc_pharm WHERE Custname LIKE  '%${name}%' `;
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.post("/productByComp/:compID", function (req, res, next) {
  res.send("save customer");
});

router.post("/searchproducts/:name", function (req, res) {
  let name = req.params.name;
  var sql_get = `SELECT * FROM tblproduct WHERE pname LIKE '%${name}%' LIMIT 10 `;
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
