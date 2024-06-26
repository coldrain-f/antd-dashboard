import React from "react";
import {
  DeleteOutlined,
  HomeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Col,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  name: string;
  component?: string;
  icon?: React.ReactNode;
  isUsed: React.ReactNode;
  children?: DataType[];
}

const columns: TableColumnsType<DataType> = [
  {
    title: "메뉴 이름",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    width: "200px",
  },
  {
    title: "컴포넌트",
    dataIndex: "component",
    key: "component",
  },
  {
    title: "아이콘",
    dataIndex: "icon",
    key: "icon",
  },
  {
    title: "사용",
    dataIndex: "isUsed",
    key: "isUsed",
  },
];

const data: DataType[] = [
  {
    name: "Home",
    isUsed: <Checkbox />,
    children: [
      {
        name: "자기 관리",
        isUsed: <Checkbox />,
        icon: (
          <Select defaultValue="lucy" style={{ width: 200 }}>
            <Select.Option>
              <Space>
                <HomeOutlined />
                <Typography.Text>HomeOutlined</Typography.Text>
              </Space>
            </Select.Option>
          </Select>
        ),
        children: [
          {
            name: "할일 관리",
            component: "<TaskManagement />",
            isUsed: <Checkbox />,
          },
          {
            name: "메모 관리",
            component: "<MemoManagement />",
            isUsed: <Checkbox />,
          },
          {
            name: "일정 관리",
            component: "<PlanManagement />",
            isUsed: <Checkbox />,
          },
        ],
      },
    ],
  },
  {
    name: "Admin",
    isUsed: <Checkbox />,
  },
  {
    name: "Guide",
    isUsed: <Checkbox />,
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

const AdminMenuManagement: React.FC = () => {
  return (
    <>
      <Row justify={"end"} align={"middle"} style={{ marginBottom: 15 }}>
        <Col span={20}>
          <Space>
            <UnorderedListOutlined />
            <Typography.Text>Total: 11</Typography.Text>
          </Space>
        </Col>
        <Col span={4} style={{ display: "flex", justifyContent: "end" }}>
          <Space>
            <Button icon={<PlusOutlined />} type="primary">
              추가
            </Button>
            <Badge count={5} color="green">
              <Button icon={<DeleteOutlined />}>선택 삭제</Button>
            </Badge>
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
      />
    </>
  );
};

export default AdminMenuManagement;
