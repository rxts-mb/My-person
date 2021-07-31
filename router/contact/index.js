// 留言联系表

const express = require("express")

const router = express.Router()

const contactDB = require("../../db/contact.js")

// 存储留言信息
router.post("/", async (req, res) => {
    let {name, email, subject, des} = req.body
    console.log(name, email, subject, des)
    if(!name || !email || !subject || !des){
        return res.send({
            code: 1,
            msg: "参数错误",
        })
    }

    try{
        await contactDB.create({name, email, subject, des})

        res.send({
            code: 0,
            msg: "留言成功",
        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~"
        })
    }
})



module.exports = router