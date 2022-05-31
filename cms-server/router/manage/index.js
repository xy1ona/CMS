const Router = require('koa-router')
const router = new Router()
const login = require('./login')
const register = require('./register')
const info = require('./info')
const upload = require('./upload')
const article = require('./article')
const nameList = require('./nameList')

// 管理系统

router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/upload', upload.routes(), upload.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())
router.use('/nameList', nameList.routes(), nameList.allowedMethods())

module.exports = router

/**
 * 【用户角色权限】
 *  1，管理员
 *      可以给普通用户增加编辑权限
 *  2，普通用户
 *
 * 【编辑许可权限】
 * 1，管理员可以编辑
 * 2，普通用户管理员赋予权限才可以编辑
 *+
 * */

// todo 鉴权 保存sessionId