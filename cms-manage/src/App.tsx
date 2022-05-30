import React, {useEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import MyHeader from "components/MyHeader";
import './App.less'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'

import { Layout, Menu, Breadcrumb } from 'antd';
import { SnippetsOutlined,EditOutlined, UsergroupAddOutlined, UnorderedListOutlined } from '@ant-design/icons';
const {  Content, Sider } = Layout;

const menuList = [
    { key: `1`, icon: React.createElement(SnippetsOutlined), label: <Link to='/list'>查看文章列表</Link>},
    { key: `2`, icon: React.createElement(EditOutlined), label: <Link to='/edit'>文章编辑</Link> },
    { key: `3`, icon: React.createElement(EditOutlined), label: <Link to='/means'>修改资料</Link> },
    { key: `4`, icon: React.createElement(UsergroupAddOutlined), label: `管理员`,  hidden: localStorage.getItem('role') !== 'admin',
        children: [{ key: `4-1`, icon: React.createElement(UnorderedListOutlined), label: <Link to='/namelist'>小编名单</Link> }]
    }
 ]
const menuItems = menuList.filter(item=> !item.hidden)

interface IProps {
    key1: number;
    changeKeyFn: ()=> void;
}

function App(props: IProps) {
    // const changeUsername = () => {
    //   localStorage.setItem('username', 'lili')
    //     //header组件更新
    //   props.changeKeyFn()
    // }
    // 侧边栏当前项的值
    const[asideKey, setAsideKey] = useState('0')
    const[bread, setBreak] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    // 监听路由变化，改变侧边栏当前项
    useEffect(()=> {
        if(location.pathname === '/') {
            navigate('/list')
        }
        switch (location.pathname) {
            case '/list':
                setAsideKey('1')
                setBreak('查看文章列表')
                break;
            case '/edit':
                setAsideKey('2')
                setBreak('文章编辑')
                break;
            case '/means':
                setAsideKey('3')
                setBreak('修改资料')
                break;
            case '/namelist':
                setAsideKey('4-1')
                setBreak('小编名单')
                break;
            default:
                setAsideKey('0')
                setBreak('')
                break;
        }
        if(location.pathname.includes('edit')) {
            setAsideKey('2')
        }
    }, [location.pathname])

    return (
        <div>
            <Layout className='container'>
                {/*<button onClick={changeUsername}>修改username</button>*/}
                <MyHeader key={props.key1}/>
                <Layout className='container_content'>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            theme="dark"
                            selectedKeys={[asideKey]}
                            style={{
                                height: '100%',
                                borderRight: 0,
                            }}
                            items={menuItems}
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{bread}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content className="myContent">
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
                <footer style={{
                    textAlign: 'center',
                    color: '#fff',
                    height: '70px',
                    lineHeight: '70px',
                    backgroundColor: '#001529'
                }}
                >Made with <span style={{color: '#ea2c0a'}}>❤</span> by Lily</footer>
            </Layout>
        </div>
    );
}

// 状态映射，将reducer中的state映射成props
const mapStateToProps = (state: { key: number }) => {
    return {
        key1: state.key
    }
}

// 事件派发映射
// const mapDisPatchToProps = (dispatch: Dispatch) => {
//     return {
//         changeKeyFn() {
//             dispatch({ type: 'changeKey'})
//         }
//     }
// }

export default connect(mapStateToProps)(App);