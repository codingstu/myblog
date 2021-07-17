
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
// 增加blog接口
// POST 请求
router.post('/addBlog', (req, res) => {
 var sql = $sql.blog.add;
 var params = req.body;
 console.log(params);
 // ! [params.username, params.age] 自动填充到之前 ？ 里面
 conn.query(sql, [params.title, params.author,params.content], (err, result) => {
 if (err) return console.log(err);
 if (result) {
 jsonWrite(res, result);
 }
 });
});

router.get('/getBlog', (req, response) => {
    let title = req.query.title
    let author = req.query.author
    let content = req.query.content
    
    // 查询语句
    let sql1 = "SELECT * FROM blog "
    conn.query(sql1, (err,res)=>{

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