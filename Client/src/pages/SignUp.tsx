import React from "react";
import {
  LockOutlined,
  UserOutlined,
  FieldNumberOutlined,
  RollbackOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Space,
  Layout,
  ConfigProvider,
  theme,
} from "antd";
import { Link } from "react-router-dom";
import CloudBanner from "../component/logo/TaskTrekBlackLogo";

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
};

const { Content } = Layout;

// Todo: - 인증번호 전송 버튼 추가
//       - 아이디 사용할 수 없는 아이디입니다.(중복체크 기능)
//       - 인증번호 validation 체크

const SignUp: React.FC = () => {
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
                }}
                bordered={false}
                cover={
                  <Link to="/join">
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
                      <RollbackOutlined />
                      돌아가기
                    </Space>
                  </Link>,
                ]}
              >
                <Form name="sign-up" layout="vertical" autoComplete="off">
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

                  <Form.Item<FieldType>
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "비밀번호 확인을 입력해 주세요.",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("비밀번호가 일치하지 않습니다.")
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={
                        <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="비밀번호 확인"
                    />
                  </Form.Item>

                  <Form.Item name="auth-code">
                    <Space.Compact style={{ width: "100%" }}>
                      <Input
                        prefix={
                          <FieldNumberOutlined
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="인증코드"
                        type="number"
                        maxLength={6}
                      />
                      <Button type="dashed">인증번호 전송</Button>
                    </Space.Compact>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      icon={<LoginOutlined />}
                    >
                      회원가입
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

export default SignUp;
