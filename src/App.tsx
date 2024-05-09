import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Form, Typography, Input, Space } from "antd";
const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title>Dashboard</Title>
        <Form
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="ID" name={"username"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name={"password"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}

export default App;
