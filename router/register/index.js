// 注册路由
const express = require('express');
const userDB = require("../../db/user.js");
const router = express.Router();


// 注册账号
router.post("/", async (req, res) => {
    let {user, pass} = req.body
    // 验证数据
    if(!user||!pass||!/^[\w\u4e00-\u9fa5]{2,8}$/.test(user)||!/^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/.test(pass)){
        return res.send({
            code: 1,
            mes: "用户名或密码格式错误"
        })
    }
    try{
        // 验证用户名是否存在
        let doc = await userDB.findOne({user})
        if(doc){
            // 用户已存在
            return res.send({
                code: 2,
                msg: "用户名已存在"
            }) 
        }
        // 用户名不存在、注册用户
        await userDB.create({user, pass});

        return res.send({
            code: 0,
            msg: "注册成功！"
        })

    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器错误，请稍后再试"
        })
    }
    
    
})


module.exports = router;