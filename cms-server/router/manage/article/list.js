// 文章列表
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../../utils')
const jwt = require('jsonwebtoken')
const moment = require('moment')

// 查询文章列表  /article/list
router.get('/', async ctx=> {
    // 去数据库查询token对应的用户
    let sql = `SELECT id,title,subTitle,date FROM article`
    let result = await queryFn(sql)

    ctx.body= returnMsg(0, '文章列表获取成功', result)
})

module.exports = router