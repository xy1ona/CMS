// 文章接口
const Router = require('koa-router')
const router = new Router()
const list = require('./list')
const info = require('./info')
const edit = require('./edit')
const del = require('./del')
const add = require('./add')

router.use('/list', list.routes(), list.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/edit', edit.routes(), edit.allowedMethods())
router.use('/delete', del.routes(), del.allowedMethods())
router.use('/add', add.routes(), add.allowedMethods())

module.exports = router