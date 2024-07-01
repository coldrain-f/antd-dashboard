import React, { useContext, useMemo, useState } from "react";
import {
  CheckSquareOutlined,
  DeleteOutlined,
  FileOutlined,
  FolderOpenOutlined,
  HolderOutlined,
  InboxOutlined,
  MenuOutlined,
  NumberOutlined,
  PlusOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import {
  Badge,
  Button,
  Col,
  Flex,
  Menu,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import { SizeType } from "antd/es/config-provider/SizeContext";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useRecoilState } from "recoil";
import { antdRecoilState } from "../../recoil/antdRecoilState";
import { Link } from "react-router-dom";

type DataIndex = keyof DataType;

interface DataType {
  key: string;
  title: string;
  deadline: string;
  status: React.ReactNode;
  priority: React.ReactNode;
  progress: React.ReactNode;
  createdAt: string;
  createdDate: string;
}

const data: DataType[] = [
  {
    key: "1",
    title: "일본어 회화 공부하기 1",
    deadline: "2024.06.28 금요일",
    status: (
      <Tag
        color="#108ee9"
        style={{
          cursor: "default",
        }}
      >
        진행 중
      </Tag>
    ),

    priority: (
      <Tag
        color="#f50"
        style={{
          cursor: "default",
        }}
      >
        높음
      </Tag>
    ),
    progress: <Progress percent={50} size="small" status="active" />,
    createdAt: "관리자",
    createdDate: "2024-06-29(토)",
  },
  {
    key: "2",
    title: "일본어 회화 공부하기 2",
    deadline: "2024.06.28 금요일",
    status: (
      <Tag
        color="#108ee9"
        style={{
          cursor: "default",
        }}
      >
        진행 중
      </Tag>
    ),

    priority: (
      <Tag
        color="#f50"
        style={{
          cursor: "default",
        }}
      >
        높음
      </Tag>
    ),
    progress: <Progress percent={50} size="small" status="active" />,
    createdAt: "관리자",
    createdDate: "2024-06-29(토)",
  },
];

const columns: TableColumnsType<DataType> = [
  {
    key: "sort",
    align: "center",
    width: 80,
    render: () => <DragHandle />,
    fixed: "left",
  },
  {
    title: "할 일 제목",
    dataIndex: "title",
    key: "title",
    render(value, record, index) {
      return <Link to="/dashboard">{value}</Link>;
    },
    fixed: "left",
  },
  {
    title: "기한",
    dataIndex: "deadline",
    key: "deadline",
  },
  {
    title: "상태",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "우선순위",
    dataIndex: "priority",
    key: "priority",
  },
  {
    title: "완료율",
    dataIndex: "progress",
    key: "progress",
    width: 200,
  },
  {
    title: "등록자",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
  },
  {
    title: "등록일",
    dataIndex: "createdDate",
    key: "createdDate",
    width: 200,
  },
];

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const TableRow: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const TaskManagement: React.FC = () => {
  const [bordered, setBordered] = useState(false);
  const [size, setSize] = useState<SizeType>("middle");
  const [dataSource, setDataSource] = useState<DataType[]>(data);
  const [recoilState] = useRecoilState(antdRecoilState);

  const [scroll, setScroll] = useState<{
    x?: number | string;
    y?: number | string;
  }>(
    dataSource.length > 0
      ? { x: "max-content", y: "calc(60vh - 50px)" }
      : { x: 0, y: "calc(60vh - 50px)" }
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

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
            <Tooltip placement="top" title={"테이블 옵션"} arrow>
              <Button icon={<SettingOutlined />} />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      <Flex gap={8} style={{ height: "600px" }}>
        <Menu
          defaultOpenKeys={["TODO_ADMIN_001", "TODO_ADMIN_002"]}
          defaultSelectedKeys={["TODO_ADMIN_001_01"]}
          style={{
            width: "300px",
            height: "100%",
            // border: recoilState.isDarkMode
            //   ? "1px solid #363636"
            //   : "1px solid #e0e0e0",
            // borderRadius: 10,
          }}
          mode="inline"
          items={[
            {
              key: "TODO_ADMIN_001",
              label: "나의 할 일",
              icon: <InboxOutlined />,
              children: [
                {
                  key: "TODO_ADMIN_001_01",
                  label: "진행 중",
                },
                {
                  key: "TODO_ADMIN_001_02",
                  label: "오늘까지",
                },
                {
                  key: "TODO_ADMIN_001_03",
                  label: "완료한 일",
                },
              ],
            },
            {
              key: "TODO_ADMIN_002",
              label: "카테고리",
              icon: <InboxOutlined />,
              children: [
                {
                  key: "group",
                  label: "일상",
                },
              ],
            },
          ]}
        />

        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              style={{ width: "1300px" }}
              rowKey="key"
              components={{ body: { row: TableRow } }}
              bordered={bordered}
              columns={columns}
              dataSource={dataSource}
              rowSelection={{
                type: "checkbox",
              }}
              scroll={scroll}
              size={size}
            />
          </SortableContext>
        </DndContext>
      </Flex>
    </>
  );
};

export default TaskManagement;
