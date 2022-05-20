const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')
const mime = require("mime-types")

router.get('/', async ctx => {
    let filePath = path.join(__dirname, "../../static/images/404.png")
    // 同步读取文件
    let file = fs.readFileSync(filePath)
    // 读取文件类型
    const mimeType = mime.lookup(filePath)
    // 根据读取的文件类型，设置content-type类型
    ctx.set("content-type", mimeType);
    ctx.body = file
})

module.exports = router