import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Divider,
  Space,
  Layout,
  theme,
  ConfigProvider,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const CloudLogin: React.FC = () => {
  const { Content } = Layout;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = () => {
    messageApi
      .open({
        type: "loading",
        content: "Action in progress..",
        duration: 2.5,
      })
      .then(() => {
        message.success("Loading finished", 2.5);
        navigate(`/dashboard`);
      });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success: ", values);
    success();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Content style={{ backgroundColor: "#ffffff" }}>
          {contextHolder}
          <Row
            justify="center"
            align="middle"
            style={{
              minHeight: "100vh",
            }}
          >
            <Col span={6}>
              <Card title="로그인" bordered={true}>
                <Form
                  name="login"
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  initialValues={{
                    remember: false,
                  }}
                >
                  <Form.Item<FieldType>
                    name="username"
                    rules={[
                      { required: true, message: "아이디를 입력해 주세요." },
                      {
                        type: "email",
                        message: "올바른 이메일 형식이 아닙니다.",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      prefix={
                        <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="아이디(Email)"
                    />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="password"
                    rules={[
                      { required: true, message: "비밀번호를 입력해 주세요." },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={
                        <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="비밀번호"
                    />
                  </Form.Item>

                  <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox>로그인 상태 유지</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      로그인
                    </Button>
                  </Form.Item>
                </Form>
                <Space split={<Divider type="vertical" />}>
                  <Link to="/">아이디 찾기</Link>
                  <Link to="/">비밀번호 찾기</Link>
                  <Link to="/join">회원가입</Link>
                </Space>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default CloudLogin;
