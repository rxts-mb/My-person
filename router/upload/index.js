// 上传图片信息


const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require("path")
const userDB = require("../../db/user")
const fs = require('fs')


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../../public/faces"))
    },
    filename: function (req, file, cb) {
      //判断文件格式   
      let TypeIndex = ["image/gif","image/jpeg","image/png"].indexOf(file.mimetype)    
      if(TypeIndex === -1){
          cb (new Error("文件格式不正确"))
          return
      }
      let ext = [".gif",".jpeg",".png"][TypeIndex]
      cb(null, file.fieldname + '-' + Date.now() + ext)
    }
  })
  
  let upload = multer({ storage }).single('avatar')


// 头像上传
router.post("/face",async (req, res) => {
    // 判断是否登录
    if(!req.session.userInfo){
        return res.send({
            code: 1,
            msg: "请先登录，再试"
        })
    }
    try{
        upload(req, res,async function(err){
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
          
              // 没有错误，一切都好，上传成功
             let _id = req.session.userInfo._id
            //   修改数据库
            let oldface =await userDB.findById({_id})
            if(oldface.face !== "faces/faces.png"){
                fs.unlinkSync("./public" + oldface.face)
            }
            

            let face = "/faces/" + req.file.filename
            await userDB.updateOne({_id},{face})
            // 修改session
            req.session.userInfo.face = face
            res.send({
                code: 0,
                msg: "图片上传成功"
            })
        })
    }catch(e){
        console.log(e)
        return res.send({
            code: 4,
            meg: "服务器出错，请稍后再试"
        })
    }

    
})


module.exports = router