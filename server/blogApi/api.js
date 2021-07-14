 
 
const httpManager = require('http');
 
const mysql = require('mysql');
// const urlManager = require('url');
 
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
 
 
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
 
//实现本地链接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'newslist',
    port: '3306'
})
 
 
// 创建application/json 解析器
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 
//写个接口
app.get('/getData', function(req, res) {
    res.status(200);
    connection.query('SELECT * FROM blog', function (error, results, fields) {
        if (error) 
            throw error;
        res.json(results);
        console.log('results is:', results);
    });
});
 
//get接口
app.get('/deleteData',  function(req, res) {
    res.status(200);
    let id  = req.query.id;
    res.json(req.query);
    connection.query('delete FROM blog where id = ?', id ,function (error, results, fields) {
        if (error) 
            throw error;
    });
    connection.end();
});
 
//post接口
app.post('/addData', urlencodedParser , function(req, res) {
    res.status(200);
    res.send(req.body);
});
 
//配置服务端口
var server = app.listen(8080, function() {
 
    var host = server.address().address;
 
    var port = server.address().port;
 
    console.log('Example app listening at http://%s:%s', host, port);
})