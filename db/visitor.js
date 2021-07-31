// 访问者表

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let visitorSchema = new Schema({
    // 用户名
    user: {required: true, type: Schema.Types.ObjectId, ref: "user",},
    // 创建时间
    time: {type: Number, default: Date.now}
})

module.exports = mongoose.model("visitor", visitorSchema);