// 管理员路由
const express = require("express")

const router = express.Router()

const multer = require("multer")
const path = require("path")

const articleDB = require("../../db/article.js")

const linkDB = require("../../db/link.js")

const contactDB = require("../../db/contact.js")
// 鉴定权限
router.post("/", (req, res) => {
    if(!req.session.userInfo || !req.session.userInfo.admin){
        return res.send({
            code: 1,
            msg: "请先以管理员身份登录"
        })

    }
    res.send({
        code: 0,
        msg: "管理员登录成功"
    })
})

// md上传配置
let mdStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../../public/article-p/md"))
    },
    filename: function (req, file, cb) {
    //   file.originalname.replace(/\.md$/, `-${Date.now()}.md`)
      cb(null, file.originalname.replace(/\.md$/, `-${Date.now()}.md`))
    }
  })
//   必须使用storage上传
let mdUpload = multer({ storage: mdStorage }).single('md')

// md上传
router.post("/md", async (req, res) => {
    mdUpload(req, res,async function(err){
        if (err instanceof multer.MulterError) {
            // 发生错误
            return res.send({
                code: 1,
                msg: "A Multer error occurred when uploading."
            })
          } else if (err) {
            // 发生错误
            return res.send({
                code: 2,
                msg: "An unknown error occurred when uploading."
            })
        }
      try{
        return res.send({
            code: 0,
            msg: "上传成功",
            mdSrc: `/article-p/md/${req.file.filename}`
        })
      }catch(e){
          console.log(e)
          return res.send({
              code: 4,
              msg: "服务器出错，请稍后重试~"
          })
      }
        
    })
})


// 文章的发发表
router.post("/article", async (req, res) => {
    if(!req.session.userInfo || !req.session.userInfo.admin){
        return res.send({
            code: 1,
            msg: "请先以管理员身份登录"
        })

    }

    const {title, des, src} = req.body

    try{
        // 创建对应文章
        let result = await articleDB.create({
            title, des, src, author: req.session.userInfo._id
        })
         res.send({
            code: 0,
            msg: "文章发表成功",
            _id: result._id
        })
    }catch(e){
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试"
        })
    }
})

// 获取文章列表
router.post("/getArticle", async (req, res) => {
    try{

        let data = await articleDB.find({}, {author: 0}, {sort: {time: -1}})
        res.send({
            code: 0,
            msg: "请求成功",
            data
        })

    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~",
            data: []
        })
    }
    
})

// 文章删除

router.delete("/article", async (req, res) => {
    let {_id} = req.body
    if(!req.session.userInfo || !req.session.userInfo.admin){
        return res.send({
            code: 1,
            msg: "请先以管理员身份登录"
        })

    }
    try{
        await articleDB.findByIdAndDelete(_id)
        res.send({
            code: 0,
            msg: "删除成功"
        })
    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~",
            data: []
        })
    }
    
})


//  添加友链

router.post("/addLink", async (req, res) =>{
    if(!req.session.userInfo || !req.session.userInfo.admin){
        return res.send({
            code: 1,
            msg: "请先以管理员身份登录"
        })

    }

    let {src, icon, name, des} = req.body
    try{
        //      数据检测
        if(!src || !icon || !name || !des){
            return res.send({
                code: 1,
                msg: "参数错误",

            })
        }
//          数据库查找是否添加

        let doc = await linkDB.findOne({src})

        if(doc){
            // 存在友链，更新友链内容
            await linkDB.findOneAndUpdate({src}, {icon, name, des})

            return res.send({
                code: 0,
                msg: "友链已存在，更新友链成功"
            })
        }
        // 友链不存在，创建友链
        await linkDB.create({
            src,
            icon,
            name,
            des
        })
        res.send({
            code: 0,
            msg: "添加友链成功"
        })


    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~"
        })
    }

})


// 删除友链
router.delete("/delLink", async (req, res) =>{
    let {_id} = req.body
    if(!req.session.userInfo || !req.session.userInfo.admin){
        return res.send({
            code: 1,
            msg: "请先以管理员身份登录"
        })

    }
    try{
        await linkDB.findByIdAndDelete(_id)
        res.send({
            code: 0,
            msg: "删除成功"
        })
    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~"
        })
    }

})

// 查看留言信息
router.get("/contact", async (req, res) =>{
    if(!req.session.userInfo || !req.session.userInfo.admin){
        return res.send({
            code: 1,
            msg: "请先以管理员身份登录"
        })

    }
    try{
        let data = await contactDB.find({},{},{sort: {time: -1}})
        res.send({
            code: 0,
            msg: "请求成功",
            data
        })
    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            msg: "服务器出错，请稍后再试~",
            data: []
        })
    }
    
})
module.exports = router