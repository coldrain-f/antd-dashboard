import React, { useState } from "react";
import {
  ClearOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  StarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type {
  DropdownProps,
  MenuProps,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Dropdown,
  Progress,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";

import { SizeType } from "antd/es/config-provider/SizeContext";

type DataIndex = keyof DataType;

interface DataType {
  key: React.Key;
  title: string;
  deadline: React.ReactNode;
  status: React.ReactNode;
  bookmark: React.ReactNode;
  priority: React.ReactNode;
  progress: React.ReactNode;
}

const data: DataType[] = [
  {
    key: 1,
    title: "일본어 회화 공부하기",
    deadline: <DatePicker style={{ width: "100%" }} />,
    bookmark: <Button icon={<StarOutlined />} />,
    status: (
      <Select
        style={{ width: "100%" }}
        defaultValue="1"
        options={[
          { value: "1", label: "시작 안 함" },
          { value: "2", label: "진행중" },
          { value: "3", label: "지연" },
          { value: "4", label: "다른 작업 대기중" },
          { value: "5", label: "완료" },
        ]}
      />
    ),
    priority: (
      <Select
        style={{ width: "100%" }}
        defaultValue="2"
        options={[
          { value: "1", label: "높음" },
          { value: "2", label: "중간" },
          { value: "3", label: "낮음" },
        ]}
      />
    ),
    progress: <Progress percent={50} size="small" status="active" />,
  },
];

const TaskManagement: React.FC = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
      rowScope: "row",
      fixed: "left",
      ellipsis: false,
      width: "33px",
    },
    {
      title: "할 일 제목",
      dataIndex: "title",
      key: "title",
      width: "220px",
    },
    {
      title: "기한",
      dataIndex: "deadline",
      key: "deadline",
      width: "180px",
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      width: "180px",
    },
    {
      title: "우선순위",
      dataIndex: "priority",
      key: "priority",
      width: "180px",
    },
    {
      title: "북마크",
      dataIndex: "bookmark",
      key: "bookmark",
      width: "60px",
    },
    {
      title: "완료율",
      dataIndex: "progress",
      key: "progress",
      width: "180px",
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <Button icon={<EditOutlined />}>편집</Button>,
      ellipsis: true,
    },
  ];

  const [open, setOpen] = useState(false);
  const [bordered, setBordered] = useState(true);
  const [size, setSize] = useState<SizeType>("middle");
  const [dataSource, setDataSource] = useState<DataType[]>(data);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>([]);
  const [scroll, setScroll] = useState<{
    x?: number | string;
    y?: number | string;
  }>(
    dataSource.length > 0
      ? { x: "max-content", y: "calc(60vh - 50px)" }
      : { x: 0, y: "calc(60vh - 50px)" }
  );

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      if (bordered) {
        setBordered(false);
      } else {
        setBordered(true);
      }
    } else if (e.key === "2") {
      setSize("small");
    } else if (e.key === "3") {
      setSize("middle");
    } else if (e.key === "4") {
      setSize("large");
    }
  };

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
    if (extra.currentDataSource.length <= 0) {
      // 필터 후 데이터가 없으면 x: 0(헤더 꺠짐 방지)
      setScroll({ x: 0, y: "calc(60vh - 50px)" });
    } else {
      setScroll({ x: "max-content", y: "calc(60vh - 50px)" });
    }
    setFilteredDataSource(extra.currentDataSource);
  };

  const calcTableHeight = (height: string) => {
    if (dataSource.length <= 0) {
      return "auto";
    }
    if (filteredDataSource.length <= 0) {
      return "auto";
    }

    return height;
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Badge
          status={bordered ? "success" : "default"}
          text={"테이블 테두리"}
        />
      ),
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <Badge
          status={size === "small" ? "success" : "default"}
          text={"테이블 사이즈(Small)"}
        />
      ),
    },
    {
      key: "3",
      label: (
        <Badge
          status={size === "middle" ? "success" : "default"}
          text={"테이블 사이즈(Middle)"}
        />
      ),
    },
    {
      key: "4",
      label: (
        <Space>
          <Badge
            status={size === "large" ? "success" : "default"}
            text={"테이블 사이즈(Large)"}
          />
        </Space>
      ),
    },
    { type: "divider" },
    {
      key: "5",
      label: (
        <Tooltip
          placement="left"
          title={"적용된 모든 필터를 초기화합니다."}
          arrow
        >
          <Space>
            <ClearOutlined />
            <Typography.Text>테이블 필터 초기화</Typography.Text>
          </Space>
        </Tooltip>
      ),
    },
    {
      key: "6",
      label: (
        <Tooltip
          placement="left"
          title={
            "필터는 유지된 상태로 적용된 테이블의 모든 설정을 기본값으로 설정합니다."
          }
          arrow
        >
          <Space>
            <ReloadOutlined />
            <Typography.Text>테이블 기본 설정</Typography.Text>
          </Space>
        </Tooltip>
      ),
    },
  ];

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
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              onOpenChange={handleOpenChange}
              open={open}
              arrow={{ pointAtCenter: true }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Tooltip placement="top" title={"테이블 옵션"} arrow>
                <Button icon={<SettingOutlined />} />
              </Tooltip>
            </Dropdown>
          </Space>
        </Col>
      </Row>
      <Table
        style={{ height: calcTableHeight("60vh") }}
        bordered={bordered}
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          type: "checkbox",
        }}
        onChange={onChange}
        scroll={scroll}
        size={size}
      />
    </>
  );
};

export default TaskManagement;
