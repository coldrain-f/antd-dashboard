import React, { useState } from "react";
import { Button, Card, Form, Input, Space, Table, Typography } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const columns: TableColumnsType<DataType> = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "나이",
    dataIndex: "age",
    key: "age",
    width: "12%",
  },
  {
    title: "주소",
    dataIndex: "address",
    width: "30%",
    key: "address",
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        name: "John Brown",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        name: "John Brown jr.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            name: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: 13,
        name: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            name: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                name: "Jim Green jr.",
                age: 25,
                address: "London No. 3 Lake Park",
              },
              {
                key: 1312,
                name: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const { Title } = Typography;

const AntdContentsTable: React.FC = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);

  return (
    <>
      <Card
        style={{ marginBottom: 20 }}
        title="검색 조건"
        extra={
          <Space>
            <Button type="primary" icon={<SearchOutlined />}>
              검색
            </Button>
            <Button icon={<ClearOutlined />}>초기화</Button>
          </Space>
        }
      >
        <Form name="horizontal_login" layout="inline" autoComplete="off">
          <Form.Item label="이름" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="나이" name="age">
            <Input />
          </Form.Item>

          <Form.Item label="주소" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Card>
      <Title level={5}>데이터 목록</Title>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
    </>
  );
};

export default AntdContentsTable;
