import React, {useEffect, useState} from 'react';
import {Table, Button, message} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import {EditorApi, ChangeEditorApi} from 'request/api'

const NameList = () => {

    interface DataType {
        key: number;
        avatar: React.ReactNode;
        username: string;
        role: string;
        editable: string | number;
        btns: React.ReactNode;
        width? : string | number
    }

    const [listData, setListData] = useState<DataType[]>([])
    const [num, setNum] = useState(0)

    const changeEditable = (id: number, open: number) => {
        ChangeEditorApi({
            id: id,
            open: open
        }).then((res:any)=> {
            if(res.code === 0) {
                message.success(res.msg)
                setNum(num+1)
            }else {
                message.warning(res.msg)
            }
        })
    }

    useEffect(()=> {
        interface IRes {
            code?: number;
            msg?: string;
            data?: any;
        }
        // 获取用户列表
        EditorApi().then((res:IRes)=> {
            // message.success(res.msg)
            let arr: DataType[] = []
            res.data.forEach((item:any)=> {
                let obj = {
                    key: item.id,
                    avatar: <img src={process.env.SERVER_PORT + item.avatar} width="40" height="40" alt='头像'/>,
                    username: item.username,
                    role: item.role === 'admin' ? '管理员' : '编辑人员',
                    editable: item.editable === 1 ? '已开通' : '未开通',
                    btns: (
                        <>
                            <Button type="primary" onClick={()=>changeEditable(item.id, 1)} style={{display: item.editable === 1 ? 'none' : ''}}>开通编辑权限</Button>
                            <Button type="primary" onClick={()=>changeEditable(item.id, 2)} danger style={{display: item.editable === 0 ? 'none' : ''}}>取消编辑权限</Button>
                        </>
                    ),
                }
                arr.push(obj)
            })
            setListData(arr)
        })
    }, [num])


    const columns: ColumnsType<DataType> = [
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar'
        },
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '编辑权限',
            dataIndex: 'editable',
            key: 'editable',
        },
        {
            title: '权限操作',
            key: 'btns',
            dataIndex: 'btns',
            width: '30%'
        }
    ];

    return (
        <Table columns={columns} dataSource={listData} pagination={false} />
    );
};

export default NameList;