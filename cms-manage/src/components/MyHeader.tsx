import React, {useState, useEffect} from 'react';
import './less/MyHeader.less'

import {Menu, Dropdown, Space, message} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const default_avatar = require('assets/images/avatar.jpg')

const MyHeader = () => {
    const [avatar, setAvatar] = useState(default_avatar)
    const [username, setUsername] = useState('匿名用户')

    const navigate = useNavigate()

    useEffect(()=> {
        const myAvatar = localStorage.getItem('avatar')
        let avatar1 = myAvatar ? process.env.SERVER_PORT + myAvatar : default_avatar
        let username1 = localStorage.getItem('username') || '匿名用户'
        setAvatar(avatar1)
        setUsername(username1)
    },[])

    // 点击修改资料
    const goMeans = () => {
        let token = localStorage.getItem('cms-token')
        if (token) {
            navigate('/means')
        }else {
            message.warning('登录失败，请重新登录', 1.5)
            setTimeout(()=> {
                navigate('/login')
            }, 1500)
        }
    }
    // 点击退出登录
    const logout = () => {
        localStorage.removeItem('cms-token')
        message.success('即将跳转登录页', 1.5)
        setTimeout(()=> {
            navigate('/login')
        }, 1500)
    }

    const menu = (
        <Menu>
            <Menu.Item key='1' onClick={goMeans}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='2' onClick={logout}>退出登录</Menu.Item>
        </Menu>
    )

    return (
        <header className="header">
            <h1>{process.env.APP_NAME}</h1>
            <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()} href='!#'>
                    <Space>
                        <img src={avatar} height={50} />
                        <span>{username}</span>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </header>
    );
};

export default MyHeader;