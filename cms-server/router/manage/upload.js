// 用户信息接口
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../utils')
const jwt = require('jsonwebtoken')
const path = require("path")
const multer = require('@koa/multer');//加载@koa/multer模块

/**
 * 【图片上传】
 * 1， 前后端要约定好图片的字段 - avatar
 * 2. 后端逻辑：
 *  a. 接收到前端传过来的图片
 *      - 判断是否超过大小限制（28k）
 *      - 设置单图上传
 *      - 存储前端传过来的图片
 *      - 读取这个文件的路径，存入数据库替换avatar字段的值
 *      - 读取数据库的整条用户信息，返回给前端
 *  3. 前端逻辑
 *   a. 调用组件
 *   b. 设置请求的地址和token
 *   c. 修改localstorage， 更新header组件
 * */
// 文件上传

let myfilename = "";    // 返回给前端的文件名

const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname ,'/images/'))
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        // logo.png -> logo.xxx.png
        myfilename = `${file.fieldname}-${Date.now().toString(16)}.${type}`
        cb(null, myfilename)
    }
})

//文件上传限制
const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 200 * 1024,//文件大小 单位 b
    files: 1//文件数量
}

const upload = multer({storage,limits})

router.post('/', upload.single('avatar'), async ctx=> {
    // 当前接口允许跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }

    // 鉴权成功，修改token对应的avatar字段
    let sql = `UPDATE user SET avatar='${myfilename}' WHERE token='${token}'`
    await queryFn(sql)

    // 重新查找这条数据，返回给前端
    let sql1= `SELECT username,avatar,token FROM user WHERE token='${token}'`
    let result = await queryFn(sql1)

    ctx.body= returnMsg(0, "修改成功", {
        'username': result[0].username,
        'avatar': result[0].avatar,
        'cms-token': result[0].token
    })
})

module.exports = router