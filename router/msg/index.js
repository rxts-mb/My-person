// 留言信息后端处理

const express = require('express')
const router = express.Router()
const msgDB = require("../../db/message.js")


// 获取留言
router.get("/data", async (req, res) => {
    try{
        let data = await msgDB
            .find({},{},/*按时间先后排序*/{sort:{time: -1}})
            .populate("user",{face: 1, user: 1})
            .populate("children.user",{face: 1,user: 1})
            .populate("children.reply",{user: 1})
        return res.send({
            code: 0,
            msg: "数据读取成功",
            data
        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试"
        })
    }
})




// 留言发表
router.post("/", async (req,res) => {
    let {userId, msg} = req.body

    // 检测数据格式是否正确
    if(!userId || !msg){
        return res.send({
            code: 1,
            msg: "参数错误"
        })
    }

    // 对数据处理
    try{
        // 存储留言
        await msgDB.create({
            msg,
            user: userId
        })
        // 存储成功
        return res.send({
            code: 0,
            msg: "留言成功"
        })

    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试"
        })
    }
})



// 回复留言
router.post("/reply", async (req, res) =>{
    let {msgId, child} = req.body
    // 对数据进行验证
    if(!msgId || !child || !child.msg || !child.user || !child.reply){
        return res.send({
            code: 1,
            msg: "数据格式错误"
        })

    }
    try{
        // 存储数据
        await msgDB.updateOne({_id: msgId}, {$push:{children: child}})
        // 回复成功
        return res.send({
            code: 0,
            msg: "回复成功"
        })
    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试"
        })
    }
})


// 喜欢点赞
router.post("/like", async (req, res) =>{
    // 数据验证
    let {parentId, childId, likes, childrenindex} = req.body;
    if(!parentId || !childId || !Array.isArray(likes)){
        return res.send({
            code: 1,
            msg: "参数格式错误"
        })
    }

    try{
        // 判断更新父级还是更新子集
        let isParent = (parentId !== childId)
        if(isParent){
            // 更新子集likes
            let key = "children." + childrenindex + ".likes"
            let doc = await msgDB.updateOne({"children._id": childId},  {[key]: likes})
        }else{
            // 更新父级likes
            await msgDB.findByIdAndUpdate(parentId, {likes})
        }

        return res.send({
            code: 0,
            msg: "数据更新成功"
        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器错误，请稍后再试"
        })
    }
    
})


module.exports = router
