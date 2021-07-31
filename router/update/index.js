// 用户信息更新

const express = require('express')
const userDB = require("../../db/user")
const router = express.Router()

// 用户名修改
router.post("/name", async (req,res) =>{
    let {newName} = req.body

    // 判断数据是否存在
    if( !newName){

        return res.send({
            code: 1,
            msg: "参数有误"
        })
    }
    // 检测是否登录
    if( !req.session.userInfo ){
        return res.send({
            code: 2,
            msg: "请先登录，再试！！！"
        })
    }
    // 更新用户信息
    try{
        // 检测用户名是否存在
        let doc = await userDB.findOne({user: newName})
        
        if(doc){
            // 用户名存在，不允许修改
            return res.send({
                code: 3,
                msg: "用户名已存在"
            })
        }



        await userDB.updateOne({ _id:req.session.userInfo._id},{user: newName})
        // 更新vuex的信息
        if (req.session.userInfo) {
            req.session.userInfo.user = newName
        }
        return res.send({
            code: 0,
            msg: "更新成功"
        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器错误，请稍后再试！"
        })
    }

})


// 修改密码
router.post("/pass", async (req, res) =>{
    let {_id , oldPass, newPass} = req.body


    // 验证密码
    let reg = /^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/

    if(!reg.test(oldPass) || !reg.test(newPass)){
        // 密码不正确
        return res.send({
            code: 1,
            msg: "参数错误，请重试"
        })
    }

    // 满足规则
    try{
    //验证原密码是否正确
    let doc = await userDB.findById(_id)
    if(!doc || doc.pass !== oldPass) {
        return res.send({
            code: 1,
            msg: "密码错误"
        })
    }

    // 更新密码
    await userDB.updateOne({_id},{pass: newPass})
    return res.send({
        code: 0,
        msg: "密码修改成功"
    })


    }catch(e){

        return res.send({
            code: 4,
            msg: "服务器错误，请稍后再试"
        })


    }
})


module.exports = router
