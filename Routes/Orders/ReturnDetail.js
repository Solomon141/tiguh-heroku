const express = require("express");
const router = express.Router();
const con = require("../../db_conn");

router.post("/save", function (req, res, next) {
  const {
    lastInsertedID,
    invoiceNum,
    batchNumber,
    salesType,
    buyingPrice,
    productId,
    Qty,
    expDate,
    returnReason,
  } = req.body;

  // const sqlQry = `SELECT * FROM returns_detail WHERE rid = ${lastInsertedID} && pid = ${productId} `;
  // con.query(sqlQry, function (err, data) {
  //   if (err) throw err;
  //   res.send(data);
  // });

  con.query(
    "INSERT INTO returns_detail(rid, invoiceNum, batchNumber, salesType, buyingPrice, pid, Qty, expDate, returnReason ) VALUES (?,?,? ,?,?,?, ?,?,?)",
    [
      lastInsertedID,
      invoiceNum,
      batchNumber,
      salesType,
      buyingPrice,
      productId,
      Qty,
      expDate,
      returnReason,
    ],
    (error, result) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(result);
    }
  );
});

router.get("/getallby_rid/:rid", function (req, res) {
  let rid = req.params.rid;
  const sqlQry =
    "SELECT `ID`, `rid`, `batchNumber`, `invoiceNum`, `salesType`, (SELECT `pname` FROM `tblproduct` WHERE `ID` = `pid`) AS productName, `Qty`, `expDate`, `buyingPrice`, `returnReason` FROM `returns_detail` WHERE `rid` = " +
    rid;
  con.query(sqlQry, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
