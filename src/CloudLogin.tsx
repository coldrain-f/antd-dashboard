import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Row, Col, Form, Input, Button, Card, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const CloudLogin: React.FC = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success: ", values);
    navigate(`/dashboard`);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={6}>
          <Card title="LOGIN" bordered={true}>
            <Form
              name="login"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item<FieldType>
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item<FieldType> name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudLogin;
