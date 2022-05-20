// 文章接口
const Router = require('koa-router')
const router = new Router()
const list = require('./list')
const info = require('./info')
const edit = require('./edit')
const del = require('./del')
const {queryFn} = require("../../../utils");
const moment = require("moment");


router.get('/', async ctx=> {
    for(let i=0; i<100; i++) {
        let sql = `INSERT INTO article VALUES (0, '你好${i}', '世界${i}', '张三${i}', '${moment().format('YYYY-MM-DD HH:MM:SS')}', '内容${i}')`
        await queryFn(sql)
    }
    ctx.body=123
})
// 文章添加
router.post('/list/add', async ctx=> {

})

router.use('/list', list.routes(), list.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/edit', edit.routes(), edit.allowedMethods())
router.use('/delete', del.routes(), del.allowedMethods())

module.exports = router