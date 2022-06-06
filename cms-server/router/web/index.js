const Router = require('koa-router')
const router = new Router()

const {queryFn, returnMsg} = require('../../utils')

// 导航接口
router.get('/nav', async ctx => {
    const sql = `SELECT * FROM nav`
    const result = await queryFn(sql)
    ctx.body = returnMsg(0 , '请求成功', result)
})

// 获取banner图
router.get('/banner', async ctx => {
    const sql = `SELECT * FROM banner`
    const result = await queryFn(sql)
    ctx.body = returnMsg(0 , '请求成功', result)
})

// 获取文章列表
router.get('/list', async ctx => {
    const sql = `SELECT id, author, title, date FROM article`
    const result = await queryFn(sql)
    ctx.body = returnMsg(0 , '请求成功', result)
})

// 根据id获取文章内容
router.get('/article', async ctx => {
    const id = ctx.request.query.id;
    const sql = `SELECT * FROM article WHERE id='${id}'`
    const result = await queryFn(sql)
    ctx.body = returnMsg(0 , '请求成功', result[0])
})

module.exports = router