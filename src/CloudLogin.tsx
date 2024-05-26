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
  Typography,
  Divider,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const { Link } = Typography;

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
              <Link href="/">아이디 찾기</Link>
              <Link href="/">비밀번호 찾기</Link>
              <Link href="/join">회원가입</Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudLogin;
