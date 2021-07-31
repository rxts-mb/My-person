const express = require('express');

const router = express.Router();

// 登录路由
router.use("/login", require("./login/index.js"));

// 注册路由
router.use("/reg", require("./register/index.js"));

//更新路由
router.use("/update", require("./update/index.js"));

// 上传路由
router.use("/upload", require("./upload/index.js"));

// 留言路由
router.use("/msg", require("./msg/index.js"));

// 访客路由

router.use("/visit", require("./visit/index.js"));

// 管理员路由
router.use("/admin", require("./admin/index.js"));

// 文章路由
router.use("/art", require("./art/index.js"));


// 友链路由

router.use("/link", require("./link/index.js") );


// 留言联系路由
router.use("/contact", require("./contact/index.js"));

module.exports = router;