import { login } from "@/services/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.less";

const prefixCls = "login";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const LoginIndex = () => {
  const history = useHistory();
  const [loginLoading, setLoginLoading] = useState(false);

  const onFinish = async (values: API.ILoginParams) => {
    setLoginLoading(true);
    const res = await login(values);
    if (res.code === 200) {
      localStorage.setItem("token", `Bearer ${res.data?.token}`);
      history.push("/home");
    }
    setLoginLoading(false);
  };

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-form`}>
        <Form requiredMark={false} initialValues={{ username: "admin", password: "123456" }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loginLoading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginIndex;
