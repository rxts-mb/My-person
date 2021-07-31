const mogoose = require("mongoose");

mogoose
    .connect("mongodb://localhost:27017/rxtsBlog", {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false})
    .then(() =>{
        console.log("数据库连接成功")
    })
    .catch(() =>{
        console.log("数据库连接失败")
    })