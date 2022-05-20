import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

interface IProps {
    showModal: boolean;
    setShowModal: (bool: boolean)=>void;
    title: string;
    subTitle: string;
    submitArticle: (res: {title: string, subTitle: string})=>void
}

const MyModal = (props: IProps) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(res=> {
            props.setShowModal(false);
            props.submitArticle(res)
        }).catch(err=> {

        })
    };

    const handleCancel = () => {
        props.setShowModal(false);
    };

    return (
        <>
            <Modal title="填写文章标题" visible={props.showModal} onOk={handleOk} onCancel={handleCancel} okText='提交' cancelText='取消'>
                <Form
                    form={form}
                    labelAlign="left"
                    initialValues={{title: props.title, subTitle: props.subTitle}}
                >
                    <Form.Item label="标题" name="title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="副标题" name="subTitle">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModal;