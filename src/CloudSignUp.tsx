import React from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  FieldNumberOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Button, Row, Col, Card, Form, Input, Typography } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  passwordConfirm?: string;
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
                  { required: true, message: "아이디를 입력해 주세요!" },
                  { type: "email", message: "올바른 이메일 형식이 아닙니다!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="아이디(Email)" />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "비밀번호를 입력해 주세요!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="비밀번호"
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="passwordConfirm"
                rules={[
                  { required: true, message: "비밀번호 확인을 입력해 주세요!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="비밀번호 확인"
                />
              </Form.Item>

              <Form.Item name="auth-code">
                <Input
                  prefix={<FieldNumberOutlined />}
                  placeholder="인증코드"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  회원가입
                </Button>
              </Form.Item>

              <Form.Item>
                <Link href="/">돌아가기</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudSignUp;
