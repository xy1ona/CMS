// 文章添加
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../../utils')
const moment = require('moment')


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
        let {title,subTitle,content} = ctx.request.body
        if(!title || !content) {
            ctx.body= returnMsg(1, "参数错误" )
            return;
        }
        // 添加这篇文章
        const myDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const author = result[0].username
        const sql1 =`INSERT INTO article VALUES(null, '${title}', '${subTitle}', '${author}', '${myDate}','${content}')`
        await queryFn(sql1)

        ctx.body= returnMsg(0, '文章添加成功', myDate)
    }else {
        // 没有编辑权限
        ctx.body= returnMsg(2, "该用户没有编辑权限" )
        return;
    }
})


module.exports = router