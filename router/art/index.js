// 文章的渲染

const express = require("express")
const router = express.Router()


const articleDB = require("../../db/article.js")



// 获取全部文章列表

router.get("/all", async (req, res) => {
    try{
        let data = await articleDB.find({}, {}, {sort: {pv: -1}})
        res.send({
            code: 0,
            msg: "请求成功",
            data
        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~",
            data: []
        })
    }
})

// 获取单独某篇文章的信息
router.get("/id", async (req, res) => {
    let {id} = req.query
    if(id.length !== 24){
        return res.send({
            code: 1,
            msg: "参数错误，请重试",
            data: []
        })
    }
    let findid = await articleDB.findById(id)
    if(findid == null){
        return res.send({
            code: 2,
            msg: "参数错误，请重试",
            data: []
        })
    }
    try{
        let data = await articleDB
                            .findById(id)
                            .populate("author",{user: 1, face: 1})
        // pv +1
        await articleDB.findByIdAndUpdate(id, {$inc: {pv: 1}})
        return res.send({
            code: 0,
            msg: "查询成功",
            data
        })
    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~"
        })
    }
    
})

// 获取热门文章

router.get("/hot", async (req, res) =>{
    try{
        let data = await articleDB.find({}, {title: 1},{skip: 0,limit: 3, sort: {pv: -1}})
        res.send({
            code: 0,
            msg: "热门文章查询成功",
            data
        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~"
        })
    }
    
})

module.exports = router
