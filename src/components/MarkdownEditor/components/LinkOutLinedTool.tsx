import { LinkOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Form, Input, Modal } from 'antd';
import React from 'react';

interface ILinkOutLinedToolProps {
  title?: string;
  toAddLink: (str: string) => void;
}

const LinkOutLinedTool = ({ title, toAddLink }: ILinkOutLinedToolProps) => {
  const [form] = Form.useForm();
  const [visible, operate] = useBoolean();

  const onFinish = (values: any) => {
    toAddLink(`[${values.link_title}](${values.link_address} "${values.link_title}")`);
    operate.setFalse();
  };

  return (
    <>
      <LinkOutlined title={title} onClick={operate.setTrue} />
      <Modal
        visible={visible}
        onCancel={operate.setFalse}
        title="添加链接"
        okText="确定"
        cancelText="取消"
        destroyOnClose
        onOk={form.submit}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="链接地址" name="link_address" rules={[{ required: true, message: '请输入链接地址' }]}>
            <Input placeholder="请输入链接地址" />
          </Form.Item>
          <Form.Item label="链接标题" name="link_title" rules={[{ required: true, message: '请输入链接标题' }]}>
            <Input placeholder="请输入链接标题" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LinkOutLinedTool;
