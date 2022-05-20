// 用户信息接口
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../utils')
const jwt = require('jsonwebtoken')
/**
 * 【获取用户信息】
 * 1，前端传token
 *  鉴权（鉴别token）——除登录注册外，所有接口都需要鉴权
 *      - token生效，可以进行步骤2
 *      - token 没生效，+token过期 +没这个用户  -- 让前端提醒用户重新登录
 * 2，从数据库检索该用户的所有信息
 *    根据token去知道现在是哪个用户，并且返回对应的信息给前端
 * */

// 查询用户信息
router.get('/', async ctx=> {
    // 获取token，前端请求头携带过来的token
    /**
     *  ctx.request 请求   ctx.request.headers 请求头  ctx.request.body 请求体
     *  ctx.response 响应   ctx.response.body 放回给前端的数据
     * */
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }
    // 去数据库查询token对应的用户
    let sql = `SELECT username,token,avatar FROM user WHERE token='${token}'`
    let result = await queryFn(sql)

    ctx.body= returnMsg(0, "查询成功", {
        'username': result[0].username,
        'avatar': result[0].avatar,
        'cms-token': result[0].token
    })
})

/**
 * 【修改用户信息】
 * 1，前端传username, password, token
 *    a. 鉴权
 *    b. 校验字段
 * 2. 到数据库替换用户名和密码
 * */
// 修改用户信息
router.post('/', async ctx=> {
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }

    let {username, password} = ctx.request.body



    // 检索数据库中是否有用户要改的名字
    let sql3 = `SELECT * FROM user WHERE username='${username}'`
    let result3 = await queryFn(sql3)
    if(result3.length > 0) {
        // 当前数据库存在这个用户名
        ctx.body= returnMsg(1, "用户名已存在")
        return
    }

    // 检索数据库获取username和password的旧值
    let sql2 = `SELECT username,token,avatar FROM user WHERE token='${token}'`
    let result2 = await queryFn(sql2)

    // 鉴权成功，修改数据库中对应的字段
    let sql = `UPDATE user SET username='${username || result2.username}', password='${password || result2.password}' WHERE token='${token}'`
    await queryFn(sql)
    // 重新查询当前用户信息，返回给前端
    let sql1 = `SELECT username,token,avatar FROM user WHERE token='${token}'`
    let result = await queryFn(sql1)

    ctx.body= returnMsg(0, "修改成功", {
        'username': result[0].username,
        'avatar': result[0].avatar,
        'cms-token': result[0].token
    })
})

module.exports = router