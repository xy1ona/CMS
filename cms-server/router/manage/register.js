const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg} = require('../../utils')
/**
 * 【注册】用户名和密码接收:
 *  1，校验是否有username和password
 *      a. 走到2
 *      b. 字段有错误，立刻返回消息（用户名或密码错误）
 *  2, 查询数据库有没有这个username
 *      a. 已经存在该用户，返回消息（请勿重复注册）
 *      b. 不存在该用户，走到3
 *  3，赋予默认用户名、密码、头像
 *      a. token生成
 *      b. 默认头像生成
 *      c. 返回注册成功给前端
* */
// 管理系统注册接口
router.post('/', async ctx=> {
    console.log(ctx.request.body)
    let {username, password} = ctx.request.body;
    // 判断username和password是否都存在
    if (username && password) {
        // 查询数据库是否有该用户
        const sql = `SELECT * FROM user WHERE username='${username}'`
        let result = await queryFn(sql)
        if (result.length >0) {
            // 有这个用户
            ctx.body = returnMsg(2, '注册失败', '该用户已存在')
        }else {
            // 没有这个用户
            // editable表示是否可编辑文章， 0不可编辑，1不可编辑
            // role表示是否为管理员，admin表示管理员，normal表示普通用户，默认normal
            let sql1 = `INSERT INTO user VALUES(null, '${username}', '${password}', null, 'avatar.jpg', 'normal', 0)`;
            await queryFn(sql1)
            ctx.body = returnMsg(0, '注册成功')
        }
    }else {
        ctx.body = returnMsg(1, '请求失败', '用户名或密码错误')
    }
})

module.exports = router