const express = require("express");
const router = express.Router();
const con = require("../../db_conn");

router.post("/save", function (req, res) {
  const {
    custID,
    SellerID,
    promoterID,
    SalesType,
    SalesTypeText,
    zcolor,
    contactPID,
  } = req.body;

  con.query(
    "INSERT INTO `tblorders`(`custID`, `SellerID`, `promoterID`,  `SalesType`, `SalesTypeText`, `zcolor`, `contactPID`) VALUES (?,?,?,?,?,?,?)",
    [
      custID,
      SellerID,
      promoterID,
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

router.post("/getall/:custID", function (req, res) {
  let custID = req.params.custID;
  con.query(
    `SELECT tblorders.ID, custID, SellerID, promoterID, orderDate, SalesType, SalesTypeText, zcolor, contactPID, tofn, pName, pPhone, (SELECT Description FROM lookup WHERE ID = titleID) AS titleText FROM tblorders INNER JOIN contactperson ON tblorders.contactPID = contactperson.ID WHERE promoterID = ${custID}`,
    (error, result) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(result);
    }
  );
});

router.get("/getbyid", function (req, res) {
  res.send("get by id promoter order");
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

module.exports = router;
