// 登录路由
const express = require('express')
const userDB = require("../../db/user.js")
const visitorDB = require("../../db/visitor.js") 
const router = express.Router()


// 登录
router.post("/", async (req,res) => {
    let {user, pass} = req.body

    // 检测数据
    if(!user || !pass){
        return res.send({
            code: 1,
            msg: "参数错误",
            data: {}
        })
    }

    // 验证用户名和密码
    try{
        let doc = await userDB.findOne({user})
        // 没有找到对应的用户
        if(!doc){
            return res.send({
                code: 2,
                msg: "用户不存在",
                data: {}
            })
        }

        // 用户存在，密码不正确
        if(doc.pass !== pass){
            return res.send({
                code: 3,
                msg: "密码不正确",
                data: {}
            })
        }


        // 登录成功
        let userInfo = {
            user: doc.user,
            _id: doc._id,
            face: doc.face,
            admin: doc.admin
        }
        // 添加最近访客
        let visitorDoc = await visitorDB.findOne({user: doc._id})
        // 更具用户查找是否登录
        if(visitorDoc){
            // 更新最近访客时间
            await visitorDB.findOneAndUpdate({user: doc._id},{time: Date.now()})
        }else{
            // 直接创建访问者
            await visitorDB.create({user: doc._id})

        }
        
        // 更新session
        req.session.userInfo = userInfo;
        return res.send({
            code: 0,
            msg: "登录成功",
            data: userInfo,

        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器错误，请稍后再试",
            data: {}
        })
    }
})

// 检测session是否登录
router.post("/check", async (req,res) => {
    if(req.session.userInfo){
        // 有session信息，已经登录过了
        let visitorDoc = await visitorDB.findOne({user: req.session.userInfo._id})
        // 更具用户查找是否登录
        if(visitorDoc){
            // 更新最近访客时间
            await visitorDB.findOneAndUpdate({user: req.session.userInfo._id},{time: Date.now()})
        }else{
            // 直接创建访问者
            await visitorDB.create({user: req.session.userInfo._id})

        }
        return res.send({
            code: 0,
            data: req.session.userInfo,
        })
    }
    res.send({
        code: 1,
        data: {}
    })
})

// 退出登录
router.post("/logout", (req, res) =>{
    // 销毁session
    req.session.destroy()  
    res.send({
        code: 0,
        msg: "退出登录成功"
    })
})

module.exports = router