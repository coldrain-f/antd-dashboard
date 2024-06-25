import React from "react";
import {
  BarcodeOutlined,
  IdcardOutlined,
  LockOutlined,
  LoginOutlined,
  SignatureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { FormProps } from "antd";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Layout,
  theme,
  ConfigProvider,
  message,
  Space,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

import CloudBanner from "../component/logo/TaskTrekBlackLogo";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const SignIn: React.FC = () => {
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
        token: {
          colorPrimary: "#4d4d4d",
        },
      }}
    >
      <Layout>
        <Content style={{ backgroundColor: "#F9FAFC" }}>
          {contextHolder}

          <Row
            justify="center"
            align="middle"
            style={{
              minHeight: "100vh",
            }}
          >
            <Col span={6}>
              <Card
                style={{
                  padding: 10,
                  borderRadius: 10,
                  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                  minWidth: "480px",
                }}
                bordered={false}
                cover={
                  <Link to="/">
                    <CloudBanner
                      width={"100%"}
                      height={"200px"}
                      viewBox="0 0 4096 3585.892473118279"
                      style={{ cursor: "default" }}
                    />
                  </Link>
                }
                actions={[
                  <Link to="/">
                    <Space>
                      <IdcardOutlined />
                      아이디 찾기
                    </Space>
                  </Link>,
                  <Link to="/">
                    <Space>
                      <BarcodeOutlined />
                      비밀번호 찾기
                    </Space>
                  </Link>,
                  <Link to="/join">
                    <Space>
                      <SignatureOutlined />
                      회원가입
                    </Space>
                  </Link>,
                ]}
              >
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      icon={<LoginOutlined />}
                    >
                      로그인
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default SignIn;
