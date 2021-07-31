// 留言信息表
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let messageSchema = new Schema({
    // 留言内容
    msg: {type: String, required: true},


    // 留言时间
    time: {type: Number, default: Date.now},

    // 留言者的ID
    user: {type: Schema.Types.ObjectId, ref: "user"},

    // 点赞数
    likes: [{type: Schema.Types.ObjectId}],

    // 子留言
    children: [
        {
        msg: String,
        user: {type: Schema.Types.ObjectId, ref: "user"},
        likes: [{type: Schema.Types.ObjectId}],
        time: {type: Number, default: Date.now},
        // @评论谁
        reply: {type: Schema.Types.ObjectId, ref: "user"}
        }
    ]


})



module.exports  = mongoose.model("message", messageSchema)