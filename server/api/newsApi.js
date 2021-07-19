
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlblog');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = (res, ret) => {
 if (typeof ret === 'undefined') {
 res.json({
 code: '1',
 msg: '操作失败',
 });
 } else {
 res.json(ret);
 }
};


router.get('/getNews', (req, response) => {
    
    // 查询语句
    let sql = "SELECT * FROM news "
    conn.query(sql, (err,res)=>{

        if(err) {
            throw err
             return;
            }
            else{
                console.log(res);
                response.json(res)
                
            }
    })
});



module.exports = router;