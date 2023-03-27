const express = require("express");
const router = express.Router();
const con = require("../../db_conn");

router.post("/save", function (req, res) {
  const { compID, pName, pPhone, titleID, insertedBy } = req.body;

  con.query(
    "INSERT INTO `contactperson`(`compID`, `pName`, `pPhone`, `titleID`, `insertedBy`) VALUES (?,?,?,?,?)",
    [compID, pName, pPhone, titleID, insertedBy],
    (error, result) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(result);
    }
  );
});

router.get("/getall_bycomp/:custID", function (req, res) {
  let custID = req.params.custID;
  con.query(
    `SELECT ID, compID, pName, pPhone, (SELECT Description FROM Lookup WHERE ID = titleID) AS titleID, Inserted_Date FROM contactperson WHERE insertedBy = ${custID}`,
    function (err, data) {
      if (err) throw err;
      res.send(data);
    }
  );
});

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  con.query(
    "DELETE FROM `contactperson` WHERE `id` = " + id,
    function (error, result) {
      if (error) return res.status(400).json(error);
      res.status(200).json(result);
    }
  );
});

module.exports = router;
