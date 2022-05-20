import React, {useState} from 'react';
import {UserInfoApi, ChangeUserInfoApi} from 'request/api'
import { Form, Input, Button, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {Dispatch} from 'redux'

interface IProps {
    changeKeyFn: ()=>void;
}

const Means = (props: IProps) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')


    interface IRes {
        code?: number;
        msg?: string;
        data?: any;
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
        ChangeUserInfoApi({
            username: values.username || '',
            password: values.password || ''
        }).then((res: IRes)=> {
            // 存储用户信息
            if(res.code === 0) {
                message.success(res.msg)
                let { avatar, username } = res.data
                localStorage.setItem('avatar', avatar)
                localStorage.setItem('username', username)
                localStorage.setItem('cms-token', res.data['cms-token'])
                // 更新Header组件， react-redux
                props.changeKeyFn();
            }else if(res.code === 1) {
                message.warning(res.msg)
            }
        })
    };

    // beforeUpload
    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // onChange
    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true );
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file)
            const res = info.file.response
            if (res.code === 0) {
                message.success('头像修改成功')
                localStorage.setItem('avatar', res.data.avatar)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('cms-token', res.data['cms-token'])
                setImageUrl(res.data.avatar)
                // 更新Header组件， react-redux
                props.changeKeyFn();
            }
            setLoading(false );
        }
    };

    // 上传按钮
    const UploadButton = ()=> (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 6 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://127.0.0.1:9000/manage/upload"
                headers={{ "cms-token": localStorage.getItem('cms-token') as string }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={process.env.SERVER_PORT + imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadButton/>}
            </Upload>
        </div>
    );
};

const mapDisPatchToProps = (dispatch: Dispatch)=> {
    return {
        changeKeyFn() {
            dispatch({ type: 'changeKey' })
        }
    }
}

export default connect(null, mapDisPatchToProps )(Means);