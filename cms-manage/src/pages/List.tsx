import React, {useState, useEffect} from 'react';
import {Button, Table, message, Pagination} from 'antd';
import type { PaginationProps } from 'antd';

import {GetArticleListApi, DeleteArticleApi} from 'request/api'
import {useNavigate} from "react-router-dom";
import moment from 'moment'

const columns = [
    {
        title: '文章标题',
        dataIndex: 'title',
        width: '60%'
    },
    {
        title: '发布时间',
        dataIndex: 'time',
        width: '20%'
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: '20%'
    },
];

interface IData {
    key: number;
    title: React.ReactNode;
    time: string;
    action: React.ReactNode;
}

// 标题与副标题
const TitleComp = (props: {title: string, subTitle?: string}) => (
    <>
        <div><a href="!#">{props.title}</a></div>
        <p>{props.subTitle || ''}</p>
    </>
)

// 操作按钮组件
const ActionBtn = (props: {current: number, id: number, getList: (current: number, pageSize: number )=>void}) => {
    const navigate = useNavigate()

    // 点击编辑按钮
    const handleEdit = () => {
        navigate('/edit/1')
    }
    // 点击删除按钮
    const handleDelete = () => {
        interface IRes {
            code?: number;
            msg?: string;
            data?: any;
        }
        DeleteArticleApi({id: props.id}).then((res:IRes)=> {
            if(res.code === 0) {
                message.success(res.msg)
                props.getList(props.current, 10)
            }else {
                message.error(res.msg)
            }
        })
    }
    
    return (
        <>
            <Button type="primary" style={{marginRight: "20px"}} onClick={handleEdit}>编辑</Button>
            <Button type="primary" danger onClick={handleDelete}>删除</Button>
        </>
    )
}



export default function List() {
    // 列表数组（泛型）
    const [data, setData] = useState<IData[]>([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)

    const getList = (current:number, pageSize: number)=> {
        GetArticleListApi(
            {
                current: current,
                counts: pageSize
            }
        ).then(res=> {
            let arr: IData[] = []

            interface IItem {
                id: number;
                title: string;
                subTitle: string;
                date: string
            }

            res.data.list.map((item: IItem)=> {
                let obj: IData = {
                    key: item.id,
                    title: <TitleComp title={item.title} subTitle={item.subTitle} />,
                    time: moment(item.date).format('yyyy-MM-DD hh:mm:ss'),
                    action: <ActionBtn current={current} getList={getList} id={item.id} />
                }
                arr.push(obj)
            })
            setData(arr)
            setTotal(res.data.total)
            setCurrent(res.data.current)
        })
    }

    useEffect(()=> {
        getList(1, 10)
    }, [])

    const onChange: PaginationProps['onChange'] = (current: number, pageSize: number) => {
        console.log('Page: ', current,pageSize);
        getList(current, pageSize)
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                showHeader={false} pagination={false}/>

            <Pagination showQuickJumper defaultCurrent={current} total={total} onChange={onChange} />
        </>

    );
}