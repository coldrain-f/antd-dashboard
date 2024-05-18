import React from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  FieldNumberOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Button, Row, Col, Card, Form, Input, Typography, Space } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
};

// Todo: - 인증번호 전송 버튼 추가
//       - 아이디 사용할 수 없는 아이디입니다.(중복체크 기능)
//       - 인증번호 validation 체크

const { Link } = Typography;

const CloudSignUp: React.FC = () => {
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
        }}
      >
        <Col span={6}>
          <Card title="회원가입">
            <Form name="sign-up" layout="vertical" autoComplete="off">
              <Form.Item<FieldType>
                name="username"
                rules={[
                  { required: true, message: "아이디를 입력해 주세요." },
                  { type: "email", message: "올바른 이메일 형식이 아닙니다." },
                ]}
                hasFeedback
              >
                <Input prefix={<UserOutlined />} placeholder="아이디(Email)" />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "비밀번호를 입력해 주세요." },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="비밀번호"
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="confirmPassword"
                rules={[
                  { required: true, message: "비밀번호 확인을 입력해 주세요." },
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
                  prefix={<LockOutlined />}
                  placeholder="비밀번호 확인"
                />
              </Form.Item>

              <Form.Item name="auth-code">
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    prefix={<FieldNumberOutlined />}
                    placeholder="인증코드"
                    type="number"
                    maxLength={6}
                  />
                  <Button type="dashed">인증번호 전송</Button>
                </Space.Compact>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  회원가입
                </Button>
              </Form.Item>
            </Form>
            <Row justify="start">
              <Col>
                <Link href="/">돌아가기</Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudSignUp;