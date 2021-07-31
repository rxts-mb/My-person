// 文章表
const mongoose = require("mongoose")

const Schema = mongoose.Schema


let articleSchema = new Schema({
    // 标题
    title: {required: true, type: String},
    // 内容
    src: {required: true, type: String},
    // 描述
    des: {required: true, type: String},
    // 作者
    author: {type: Schema.Types.ObjectId, ref: "user"},
    // 时间
    time: {type: Number, default: Date.now},
    // 浏览量热度
    pv: {type: Number, default: 0},
    // 封面图
    cover: {type: String, default: "/article-p/cover/default.jpg"},

    //   cover: {type: String, default:"/article-public/cover/default.jpg"},
})

module.exports = mongoose.model("article", articleSchema)