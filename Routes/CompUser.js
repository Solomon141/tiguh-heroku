const express = require("express");
const router = express.Router();
const SendConfirmationMail = require("../Collection/MailSender");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const con = require("../db_conn");

router.post("/save", function (req, res) {
  const { Full_Name, RoleID, email, password, TinNum, PhoneNum } = req.body;
  var sql = "SELECT * FROM `customeruser` WHERE `email` = ?";

  con.query(sql, [email], function (error, result) {
    if (result.length >= 1) {
      res.send({
        error: true,
        message: "Email Already Exists",
      });
    } else {
      const vkey = crypto.randomBytes(16).toString("hex");
      con.query(
        "INSERT INTO `customeruser`( `name`,`RoleID`,`email`, `password`, `vkey`, `TinNum`, `PhoneNum`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [Full_Name, RoleID, email, password, vkey, TinNum, PhoneNum],
        (error, result) => {
          if (error) return res.status(400).json(error);
          res.status(200).json(result);
          SendConfirmationMail(email, vkey);
        }
      );
    }
  });


});

router.get("/users", function (req, res) {
  con.query("SELECT * FROM `customeruser`", (error, result) => {
    if (error) return res.status(400).json(error);
    res.status(200).json(result);
  });
});



router.get("/AllCustomers", function (req, res) {
  con.query(
    "SELECT * FROM `authuser` WHERE `RoleID` = 101",
    (error, result) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(result);
    }
  );
});

router.put("/activate", function (req, res) {
  res.send(" Activate User ");
});

router.put("/deactivate", function (req, res) {
  res.send(" Deactivate User ");
});

router.post("/login", function (request, response, next) {
  const { email, password } = request.body;
  if (email && password) {
    var sql = "SELECT * FROM `customeruser` WHERE `email` = ? AND `password` = ?";

    con.query(sql, [email, password], function (error, resdata) {
      if (resdata.length === 1) {
        let JWT_KEY = process.env.JWT_KEY;
        let userid = resdata[0].id;
        let fullname = resdata[0].name;
        let RoleID = resdata[0].RoleID;
        let data = { userid, fullname, email, RoleID };
        if (resdata[0].Is_Active) {
          // const token = jwt.sign(data, JWT_KEY);
          response.send({
            error: false,
            data: data,
            message: "Login Successful",
          });
          // response.send(data);
        } else {
          response.send({
            error: true,
            message: "Your account is not active",
          });
        }
      } else {
        response.send({
          error: true,
          message: "Incorrect Email or Password",
        });
      }
      response.end();
    });
  } else {
    response.send({
      error: true,
      message: "Email or Password missing",
    });
    response.end();
  }
});

router.get("/verify/:vkey", function (req, res) {
  const { vkey } = req.params;

  con.query(
    `UPDATE customeruser SET is_active = '1', email_verified_at= NOW() WHERE vkey = '${vkey}' `,
    function (err, result) {
      if (err) {
        res.send({
          error: true,
          message: "Error occured Please Contact us!",
        });
      }
      if (result.affectedRows === 0) {
        res.send({
          error: true,
          message: "Account Not Activated Please Contact us!",
        });
      } else {
        res.send({
          error: false,
          message: "Account Activated Successfuly",
        });
      }
    }
  );
});

module.exports = router;
