const express = require('express')
const router = express.Router();

const con = require('../db_conn') 

router.get('/save', function(req, res, next){
    var sql = "INSERT INTO `tblSample`(`name`,`email`) VALUES ('Solomon', 'weymit2001@gmail.com')";
    con.query(sql, function(err, data){
        if(err) throw err;
        console.log("Data inserted")
    })
});

router.get('/getall', function(req, res, next){
    var sql_get = "SELECT * FROM `lookup`";
    con.query(sql_get, function(err, data){
        if(err) throw err;
        res.send(data)
    })
})

router.get('/getone', function(req, res, next){
    var sql_get = "SELECT * FROM `lookup`";
    con.query(sql_get, function(err, data){
        if(err) throw err;
        console.log(data)
    })
})

router.get('/update', function(req, res, next){
    var sql_get = "SELECT * FROM `lookup`";
    con.query(sql_get, function(err, data){
        if(err) throw err;
        console.log(data)
    })
})


router.get('/delete', function(req, res, next){
    var sql_get = "SELECT * FROM `lookup`";
    con.query(sql_get, function(err, data){
        if(err) throw err;
        console.log(data)
    })
})

module.exports = router;