const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg} = require('../../utils')
const jwt = require('jsonwebtoken')
/**
 * 【登录】用户名和密码接收:
 *  1，校验是否有username和password
 *      a. 走到2
 *      b. 字段有错误，立刻返回消息（用户名或密码错误）
 *  2, 查询数据库有没有这个username
 *      a. 已经存在该用户，走到3
 *      b. 不存在该用户，返回消息（请先注册）
 *  3，把生成的token存入user表，并且查询对应0用户的所有信息返回给前端
 * */

// 管理系统登录接口
router.post('/', async ctx=> {
    console.log(ctx.request.body)
    let {username, password} = ctx.request.body;

    if (username && password) {
        // 查询数据库是否有该用户
        const sql = `SELECT * FROM user WHERE username='${username}'`
        const result = await queryFn(sql)
        if (result.length >0) {
            // 有这个用户， 把生成的token更新到这个用户上
            // 根据username和password生成token
            let token=jwt.sign(
                {username, password},    // 携带信息
                'miyao',          // 秘钥
                {expiresIn:'1h'}        // 有效期：1h一小时
            )
            const sql1 = `UPDATE user SET token='${token}' WHERE username='${username}'`
            // 插入token
            await queryFn(sql1)
            // 再次查询用户
            const result1 = await queryFn(sql)
            const obj = {
                username: result1[0].username,
                'cms-token': result1[0].token,
                id: result1[0].id,
                avatar: result1[0].avatar,
                role: result1[0].role,
                editable: result1[0].editable,
            }
            ctx.body = returnMsg(0, '登录成功', obj)
        }else {
            // 没有这个用户
            ctx.body = returnMsg(2, '用户不存在', '用户不存在，请先注册')
        }
    }else {
        ctx.body = returnMsg(1, '参数错误', '用户名或密码错误')
    }
})

module.exports = router