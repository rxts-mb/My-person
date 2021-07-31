// 友链表

const mongoose = require("mongoose")

const Schema = mongoose.Schema


let linkSchema = new Schema({
    // 名称
    name: String,
    // 地址
    src: String,
    // 图片地址
    icon: String,
    // 内容
    des: String


})

module.exports = mongoose.model("link", linkSchema)