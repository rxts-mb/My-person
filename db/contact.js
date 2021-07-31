// 留言联系表

const mongoose = require("mongoose")

const Schema = mongoose.Schema


let contactSchema = new Schema({
    // 留言者名字
    name: {required: true, type: String},
    // email地址
    email: {required: true, type: String},
    // 主题
    subject: String,
    // 留言内容
    des: {required: true, type: String},
    // 留言时间
    time: {type: Number, default: Date.now},

})

module.exports = mongoose.model("contact", contactSchema)