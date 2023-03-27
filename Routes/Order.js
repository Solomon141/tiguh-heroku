const express = require("express");
const router = express.Router();
const con = require("../db_conn");

// Promoter Start
router.post("/save", function (req, res) {
  const {
    custID,
    SellerID,
    promoterID,
    orderDate,
    SalesType,
    SalesTypeText,
    zcolor,
    contactPID,
  } = req.body;

  con.query(
    "INSERT INTO `tblorders`(`custID`, `SellerID`, `promoterID`, `orderDate`, `SalesType`, `SalesTypeText`, `zcolor`, `contactPID`) VALUES (?,?,?,?,?,?,?,?)",
    [
      custID,
      SellerID,
      promoterID,
      orderDate,
      SalesType,
      SalesTypeText,
      zcolor,
      contactPID,
    ],
    (error, result) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(result);
      // SendConfirmationMail(email, vkey);
    }
  );
});
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  con.query(
    "DELETE FROM `tblorders` WHERE `id` = " + id,
    function (error, result) {
      if (error) return res.status(400).json(error);
      res.status(200).json(result);
    }
  );
});

router.get("/getGenInfo/:id", function (req, res) {
  let id = req.params.id;
  var sql_get =
    "SELECT `ID`, `custID`, (SELECT `Description` FROM `lookup` WHERE `ID` = `SellerID`) AS SellerName, (SELECT CONCAT( `pName` , ' - ' , `pPhone`) FROM `contactperson` WHERE `ID` = `contactPID`) AS FullInfo FROM `tblorders` WHERE `ID` =  " +
    id;
  con.query(sql_get, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.patch("/patch", function (req, res) {
  res.send("patch order");
});
router.get("/get", function (req, res) {
  res.send("get order");
});
router.get("/getall", function (req, res) {
  res.send("pgetall order");
});

router.get("/getbyemp", function (req, res) {
  res.send("pgetbyemp order");
});
// Promoter End

module.exports = router;
