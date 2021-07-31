const express = require('express');
const path = require("path")

const app = express();

// 监听3000端口
app.listen(3000);

// 连接数据库
require("./middle/mogoose/mogoose.js");



// 临时跨域处理
/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})
*/

// 中间件的处理
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));


// 配置session
app.use(require("./middle/session/index.js"))

// 路由监听
app.use("/", require("./router/index"))

//配置history前端路由
app.use("/", (req,res) =>{
  res.sendFile(path.join(__dirname,"./public/index.html"))
})