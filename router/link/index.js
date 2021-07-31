// 友链路由

const express = require("express")

const router = express.Router()

const linkDB = require("../../db/link.js")


// 返回所有友链

router.get("/", async (req, res) =>{
    try{
        let data = await linkDB.find()

        res.send({
            code: 0,
            msg: "请求成功",
            data
        })
    }catch(e){
        consle.log(e)
        return res.send({
            coed: 4,
            msg: "服务器出错，请稍后再试"
        })
    }
})



module.exports = router