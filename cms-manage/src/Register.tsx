import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterApi } from 'request/api'

import './Login.less'

interface IRegister {
    username:string
    password: string
    password1?: string
}

const Register = () => {
    const navigate = useNavigate()

    // 点击注册
    const onFinish = (values: IRegister) => {
        console.log('Success:', values);
        // 获取用户名和密码
        let { username, password, password1 } = values
        if (password !== password1) {
            message.warning('请输入相同的密码')
            return
        }

        interface IRes {
            code?: number;
            msg?: string;
            data?: any;
        }

        // 注册
        RegisterApi({
            username: username,
            password: password
        }).then((res: IRes)=> {
            console.log(res)
            if(res.code === 0) {
                message.success(res.msg, 1.5)
                // 跳转登录页
                setTimeout(()=> {
                    navigate('/login')
                },1500)
            }

        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login_box">
            <h1>{process.env.APP_NAME}</h1>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                </Form.Item>
                <Form.Item
                    name="password1"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次确认密码" />
                </Form.Item>

                <Form.Item>
                    <Link to="/login">已有账号？返回登录</Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;