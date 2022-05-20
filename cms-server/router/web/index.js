const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx => {
    ctx.body = '官网数据'
})

module.exports = router