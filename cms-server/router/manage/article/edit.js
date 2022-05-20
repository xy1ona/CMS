// 文章编辑
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../../utils')
const moment = require('moment')


/**
 * 【文章编辑】
 *  0, 鉴权
 *  1，前端传文章id
 *  2，到数据库查找对应id的文章
 *  3，title,subTitle,content,date,author字段修改
 * */
// 文章编辑 article/edit
router.post('/', async ctx=> {
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }
    // 从token中获取该用户是否有编辑权限
    const sql = `SELECT * FROM user WHERE token='${token}'`
    const result = await queryFn(sql)
    if(result[0].editable === 1) {
        // 有编辑权限
        let {id,title,subTitle,content} = ctx.request.body
        // 查询数据库是否有这篇文章
        const sql1 = `SELECT * FROM article WHERE id='${id}'`
        const result1 = await queryFn(sql1)

        // 有这篇文章
        if(result1.length > 0) {
            // 修改这篇文章
            const myDate = moment().format('YYYY-MM-DD HH:MM:SS')
            const author = result[0].username
            const sql2 =`UPDATE article SET title='${title}', subTitle='${subTitle || ''}', content='${content || ''}', date='${myDate}', author='${author}' WHERE id='${id}' `
            await queryFn(sql2)

            //修改完这篇文章
            ctx.body= returnMsg(0, '文章修改成功')
        }else {
            // 没有这篇文章
            ctx.body= returnMsg(2, "当前编辑的文章不存在" )
            return;
        }

    }else {
        // 没有编辑权限
        ctx.body= returnMsg(2, "该用户没有编辑权限" )
        return;
    }
})


module.exports = router