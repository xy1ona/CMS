// 引入mysql
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

// 开发环境的host
let host = 'http://127.0.0.1'
// 生成环境的host

// 开发环境的port
let port = 9000

// 创建连接池
const pool = mysql.createPool({
    host: "localhost",  // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: 3306, // mysql服务运行的端口
    database: "cms", // 选择某个数据库
    user: "root",   // 用户名
    password: "123456", // 用户密码
})

//对数据库进行增删改查操作的基础
const query = (sql,callback) => {
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}

/**
 * 返回信息的结构
 * code: 0 成功，1 参数错误，2其他错误
 * msg: 请求结构信息
 * data: 返回给前端的数据
 */
const returnMsg =(code, msg, data) => {
    return {
        code: code || 0,
        msg: msg || '',
        data: data || {}
    }
}

/**
 * 数据库操作promise封装
 * code: 0 成功，1 参数错误，2其他错误
 * msg: 请求结构信息
 * data: 返回给前端的数据
 */
const queryFn = (sql) => {
    return new Promise((resolve, reject)=>{
        query(sql, (err, rows)=>{
            if(err) reject(err);  // []
            resolve(rows);  // 返回拿到的数据 [{}]
        })
    })
}

// 鉴权函数
const jwtVerify = (token) => {
    try{
        // 解密token可以得到username和password
        jwt.verify(token,'miyao')//验证
    }catch(err){
        // 鉴权失败
        return false;
    }
    // 鉴权成功
    return true;
}

module.exports = {
    host,
    port,
    query,
    returnMsg,
    queryFn,
    jwtVerify
}