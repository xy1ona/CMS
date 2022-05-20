// 文章删除
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../../utils')
const moment = require('moment')


// 文章编辑 article/edit
router.post('/', async ctx=> {
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }
    // 从token中获取该用户是否有编辑权限
    const sql = `SELECT editable FROM user WHERE token='${token}'`
    const result = await queryFn(sql)
    if(result[0].editable === 1) {
        // 有编辑权限
        let {id} = ctx.request.body
        // 查询数据库是否有这篇文章
        const sql1 = `SELECT * FROM article WHERE id='${id}'`
        const result1 = await queryFn(sql1)

        // 有这篇文章
        if(result1.length > 0) {
            // 删除这篇文章
            const sql2 =`DELETE FROM article WHERE id='${id}'`
            await queryFn(sql2)

            //修改完这篇文章
            ctx.body= returnMsg(0, '文章删除成功')
        }else {
            // 没有这篇文章
            ctx.body= returnMsg(2, "当前删除的文章不存在" )
            return;
        }

    }else {
        // 没有编辑权限
        ctx.body= returnMsg(2, "该用户没有删除权限" )
        return;
    }
})


module.exports = router