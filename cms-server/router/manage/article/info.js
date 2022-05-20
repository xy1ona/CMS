// 文章详情
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../../utils')


// 根据前端传的id获取文章 article/info/{id}
router.get('/:id', async ctx=> {
    ctx.body = ctx
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }
    // const { id } = ctx.request.body
    const id = ctx.url.split('/')[ctx.url.split('/').length-1]
    const sql = `SELECT * FROM article WHERE id='${id}'`
    const result = await queryFn(sql)

    if (result.length) {
        ctx.body= returnMsg(0, '文章获取成功', result[0])
    }else {
        ctx.body= returnMsg(1, '该文章不存在')
    }

})


module.exports = router