import React from 'react';
import {Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import {LoginApi} from "./request/api";

import './Login.less'

const Login = () => {
    const navigate = useNavigate()

    // 点击登录
    const onFinish = (values: any) => {
        console.log('Success:', values);
        // 获取用户名和密码
        let { username, password } = values

        interface IRes {
            code?: number;
            msg?: string;
            data?: any;
        }

        // 登录
        LoginApi({
            username: username,
            password: password
        }).then((res: IRes)=> {
            console.log(res)
            if(res.code === 0) {
                message.success(res.msg, 1.5)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('cms-token', res.data['cms-token'])
                localStorage.setItem('avatar', res.data.avatar)
                localStorage.setItem('role', res.data.role)
                localStorage.setItem('editable', res.data.editable)
                // 跳转根路径
                setTimeout(()=> {
                    navigate('/')
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

                <Form.Item>
                    <Link to="/register">还没账号？立即注册</Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;