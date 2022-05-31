// 小编名单
const Router = require('koa-router')
const router = new Router()
const {queryFn, returnMsg, jwtVerify} = require('../../utils')

// 获取小编列表
router.get('/', async ctx=> {
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }
    // 读取数据库中所有用户
    let sql = `SELECT id,username,avatar,role,editable FROM user WHERE role='normal'`
    const result = await queryFn(sql)
    ctx.body= returnMsg(0, "获取用户列表成功", result)
})

// 修改编辑权限
router.post('/', async ctx=> {
    let token = ctx.request.headers['cms-token']
    // 鉴权
    if(!jwtVerify(token)) {
        ctx.body= returnMsg(2, "查询用户信息失败", 'token无效或登录已过期')
        return;
    }
    // 根据前端传过来的id，修改用户的编辑权限
    /**
     * 开通编辑权限，open传1，关闭编辑权限，open传2
     * */
    let {id, open} = ctx.request.body
    if(!id) {
        ctx.body= returnMsg(1, "参数错误")
        return;
    }
    let sql1 = `SELECT editable FROM user WHERE id=${id}`
    let result1 = await queryFn(sql1)
    // 如果这个用户已经有编辑权限
    if (result1[0].editable === 1 && open === 1) {
        ctx.body= returnMsg(0, "该用户已有编辑权限" )
        return
    }
    // 如果这个用户本来就没有编辑权限
    if (result1[0].editable === 0 && open === 2) {
        ctx.body= returnMsg(2, "该用户没有编辑权限" )
        return
    }
    // 修改用户编辑权限
    let sql2 = `UPDATE user SET editable='${open === 1 ? 1 : 0}' WHERE id='${id}'`;
    await queryFn(sql2)
    ctx.body= returnMsg(0, "用户编辑权限修改成功" )
})

module.exports = router