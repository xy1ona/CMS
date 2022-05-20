import { useEffect, useState } from 'react';
import { PageHeader, Button, message } from 'antd';
import E from 'wangeditor'
import {useLocation, useParams} from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from "moment";
import MyModal from "./MyModal";
import {GetArticleDyIdApi, EditArticleApi} from 'request/api'

let editor = null

const Editor = () => {
    const {id} = useParams()

    const location = useLocation()
    const [content, setContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalSubTitle, setSubModalTitle] = useState("");

    // modal显示隐藏控制
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // 实例化
        editor = new E("#myeditor")

        editor.config.onchange = (newHtml) => {
            setContent(newHtml);
        }

        // 创建
        editor.create()

        // 获取地址栏id
        console.log(id)
        if(id) { // 获取文章
            GetArticleDyIdApi(id).then(res=> {
                message.success(res.msg)
                setContent(res.data.content)
                editor.txt.html(res.data.content)
                setModalTitle(res.data.title)
                setSubModalTitle(res.data.subTitle)
            })
        }else { // 编辑文章

        }

        return () => {
            // 组件销毁时销毁编辑器
            editor.destroy()
        }
    }, [])

    // 模态框点击提交请求
    const submitArticle = (values)=> {
        console.log(values)
        EditArticleApi({
            id: id,
            content: content,
            ...values
        }).then(res=> {
            message.success(res.msg)
        })
    }

    return (
        <div className="editor">
            <PageHeader
                style={{padding: 0, marginBottom: '20px'}}
                onBack={() => null}
                backIcon={location.pathname === '/edit' ? false : <ArrowLeftOutlined />}
                ghost={false}
                title="文章编辑"
                subTitle={`当前日期：${moment().format('YYYY-MM-DD')}`}
                extra={[
                    <Button key="3" type="primary" onClick={()=>{setShowModal(true)}}>提交文章</Button>,
                ]}
            ></PageHeader>
            <div id="myeditor"></div>
            <MyModal
                showModal={showModal}
                setShowModal={setShowModal}
                title={modalTitle}
                subTitle={modalSubTitle}
                submitArticle={submitArticle}/>
        </div>
    );
}

export default Editor;