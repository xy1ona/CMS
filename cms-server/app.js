// node项目基本都是使用require引入
const Koa = require('koa2')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const { port , host } = require('./utils')
const manage = require('./router/manage')
const web = require('./router/web')
const noMatch = require('./router/noMatch')
// 引入koa2-cors中间件
const cors = require('koa2-cors')
// 引入koa-static中间件
const static = require('koa-static')
// 引入koa-bodyparser中间件
const bodyParser = require('koa-bodyparser');

const path = require('path')

router.get('/', async ctx => {
    ctx.body = '首页数据'
})

router.get('/list', async ctx => {
    ctx.body = '列表页数据'
})

router.use("/manage", manage.routes(), router.allowedMethods())
router.use("/web", web.routes(), router.allowedMethods())
router.use('/404', noMatch.routes(), router.allowedMethods())

// 重定向到/404
app.use(async (ctx, next)=> {
    await next(); // 放行下一个中间件
    if (parseInt(ctx.status) === 404) {
        // ctx.body => ctx.response.body的简写
        ctx.response.redirect('/404')  // 重定向到/404
    }
})

// 允许跨域，cors中间件一定要写在路由之前
app.use(cors());

// 读取静态资源中间件一定要写在路由之前
// 在页面中读取404.png - http://127.0.0.1:9000/images/404.png
app.use(static(path.join(__dirname, '/static')));
app.use(static(path.join(__dirname, '/router/manage/images')));

// 将post请求的参数转为json格式返回
app.use(bodyParser());

app.use(router.routes(), router.allowedMethods());

app.listen(port, ()=> {
    console.log(`Server is running at ${host}:${port}`)
})