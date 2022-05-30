// 文章列表
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../../utils')
const jwt = require('jsonwebtoken')
const moment = require('moment')

// 查询文章列表  /article/list
router.post('/', async ctx=> {
    // 得到数据库中有多少条数据total
    let sql = `SELECT COUNT(*) FROM article`
    let result = await queryFn(sql)
    let total = result[0]['COUNT(*)']
    //获取前端传过来的当前页码(current)和每页个数(counts)
    let {current, counts} = ctx.request.body;
    //确认前端传了这两个参数
    if(!current || !counts) {
        ctx.body= returnMsg(1, '参数错误')
        return
    }

    //去数据库查询对应的数据
    let sql1 = `SELECT id,title,subTitle,date FROM article LIMIT ${(current-1) * counts}, ${counts}`
    let result1 = await queryFn(sql1)
    // 查询有多少条记录
    // let sql = `SELECT COUNT(*) FROM article`
    // 第十条开始查询10条记录
    // let sql = `SELECT * FROM article LIMIT 10, 10`

    ctx.body= returnMsg(0, '分页查询成功',{
        current, counts, total,
        list: result1
    })
})

module.exports = router