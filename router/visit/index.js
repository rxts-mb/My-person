// 最近访客



const express = require("express")
const visitorDB = require("../../db/visitor.js")
const router = express.Router()

// 获取最近访客
router.get("/", async (req, res) => {
    try{
        let data = await visitorDB.find({},{},{skip:0,limit:12,sort:{time:-1}})
                            .populate("user", {user: 1, face: 1})
        return res.send({
            code: 0,
            msg: "请求成功",
            data
        })
    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器错误，请稍后重试~~",
            data: []
        })
    }
})

module.exports = router
