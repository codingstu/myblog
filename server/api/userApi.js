// var models = require('../db');
// var express = require('express');
// var router = express.Router();
// var mysql = require('mysql');
// var $sql = require('../sqlMap');
// // 连接数据库
// var conn = mysql.createConnection(models.mysql);
// conn.connect();
// var jsonWrite = function(res, ret) {
//     if(typeof ret === 'undefined') {
//         res.send('err')
//     } else {
//         //res.json(ret);
//         res.send('ok')
//     }
// };
// // 增加用户接口
// router.post('/addUser', (req, res) => {
//     var sql_name = $sql.user.select_name
//     var sql = $sql.user.add;
//     var params = req.body;
//     console.log(params);
//     conn.query(sql_name,params.username,function(err,result) {
//         if(err) {
//             console.log(err)
//         }
//         if(result[0]===undefined) {
//             conn.query(sql,[params.username,params.password], function(err, result) {
//                 if(err) {
//                     console.log(err)
//                 }
//                 if(result) {
//                     jsonWrite(res, result)
//                 }
//             })
//         }else {
//             res.send('-1')    //当前注册username与数据库重复时，data返回-1
//         }
//     })
    
// });

// //查找用户接口
// // router.post('/selectUser', (req,res) => {
// //     var sql_name = $sql.user.select_name;
// //     var sql_password = $sql.user.select_password;
// //     var params = req.body;
// //     conn.query(sql_name,params.username,function(err, result) {
// //         if(err) {
// //             console.log(err)
// //         }
// //         if(result[0]===undefined) {
// //             res.send('-1')    //查询不出username，data返回-1
// //         }else {
// //             conn.query(sql_password,params.password, function(err, result) {
// //                 if(err) {
// //                     console.log(err)
// //                 }
// //                 if(result[0]===undefined) {
// //                     res.send('0')    //username正确后，password错误，data返回 0
// //                 }else {
// //                     //服务器 Set-Cookie 设置过期时间7天
// //                     res.cookie('isAuth',1, {maxAge: 7 * 24 * 60 * 1000})
// //                     jsonWrite(res, result);
// //                 }
// //             })
// //         }
// //     })
// // });
// module.exports = router;


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

 
//  GET 请求
//  router.get('/getUser', (req, res) => {
//   let sql = $sql.user.get;
//   let params = req.query;
//   let name = req.query.userName
//   let pwd = req.query.userPassword
//   console.log(params);
//   conn.query(sql, (err, result) => {
// //   if (err) {
// //   console.log(err);
// //   }
// //   console.log(res, result);
// //   });
// if(err) {
//     throw err
//      return;
//     }else{    
//     if(res.length>0){
//       //将数据库传来的数据转化为JSON格式
//     let uPasswordString = JSON.stringify(res);
//     let userPassword = JSON.parse(uPasswordString)[0].password;
//       if(userPassword == pwd){
//         //将数据库的密码userPassword 和服务端 传来的密码相等
//         response.send({statusCode:200, msg:'登录成功'})
//         return
//     }else{
//     response.send({ statusCode:0, msg:'密码不正确'})  
//     return
//   } 
//     }
//     } 
//     //如果没有数据，说明用户名填写错误 
//     response.send({ statusCode:0, msg:'用户名不正确'})    
      
   
// });   
//  });
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