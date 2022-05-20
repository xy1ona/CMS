# mysql的连接和断开
# cmd -> 管理员权限

# 启动mysql
# net start mysql
# 计算机管理器->服务和应用程序->服务->mysql启动

# 连接mysql
$ mysql -uroot -p123456

# 断开mysql
$ exit;
$ quit;

# 显示数据库
$ show databases;

# 创建数据库
$ CREATE DATABASE cms;

# 删除数据库（慎用）
$ DROP DATABASE cms;

# 使用指定的数据库
$ USE cms;

# 创建user表  (id, username, password)
# 字符串 VARCHAR，数字 INT
# COMMENT 备注
# id （主键 PRIMARY KEY），自增（AUTO_INCREMENT）
$ CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) COMMENT "用户名",
    password VARCHAR(30) COMMENT "密码"
);

# 查看表
SHOW TABLES;

# 删除指定的表
DROP TABLE user;

# 描述表
DESCRIBE user;

# 表格的增删改查
# 增加表数据      id（主键自增 从1开始）   username  password
INSERT INTO user VALUES(0, '张三', '123456');
INSERT INTO user VALUES(0, '李四', '123456');

# 查询表数据
    # 查询user表中所有数据
    SELECT * FROM user;

    # 查询user表中用户名为张三
    SELECT * FROM user WHERE username = "张三";

    # 查询user表中用户名为张三的密码
    SELECT id,password FROM user WHERE username = "张三";

# 更新表数据
    # 查询李四的密码
    SELECT password FROM user where username = "李四";

    # 修改李四的密码为999999
    UPDATE user SET password="999999" WHERE username="李四";

# 删除表数据
    # 添加一条王五的数据，密码为456789
    INSERT INTO user VALUES(0, '王五', '456789');
    # 查询王五这条数据
    SELECT * FROM user WHERE username="王五";
    # 删除王五这条记录
    DELETE FROM user WHERE username="王五";








