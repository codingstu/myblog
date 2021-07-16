

 var models = require('../db');
 var express = require('express');
 var router = express.Router();
 var mysql = require('mysql');
 var $sql = require('../sqlMap');
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
 // 增加用户接口
 // POST 请求
 router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  // ! [params.username, params.age] 自动填充到之前 ？ 里面
  conn.query(sql, [params.username, params.password,params.checkpwd], (err, result) => {
  if (err) return console.log(err);
  if (result) {
  jsonWrite(res, result);
  }
  });
 });

 
router.get('/getUser', (req, response, next) => {
    let username = req.query.username
    let pwd = req.query.password
    
    // 查询语句
    let sql = "SELECT * FROM user WHERE name = '"+username+"'"
    conn.query(sql,(err,res)=>{
        if(err) {
            throw err
             return;
            }else{
            if(res.length>0){
              //将数据库传来的数据转化为JSON格式
            let upassword = JSON.stringify(res);
            let pass = JSON.parse(upassword)[0].password;
              if(pass == pwd){
                //将数据库的密码userPassword 和服务端 传来的密码相等
                response.send({statusCode:200, msg:'登录成功'})
                return
            }else{
            response.send({ statusCode:0, msg:'密码不正确'})  
            return
          } 
            }
            } 
            //如果没有数据，说明用户名填写错误 
            response.send({ statusCode:0, msg:'用户名不正确'})   

    })
});

 module.exports = router;