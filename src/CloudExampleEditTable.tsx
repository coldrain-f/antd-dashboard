import React, { useRef, useState } from "react";
import {
  AppstoreAddOutlined,
  CheckOutlined,
  DeleteColumnOutlined,
  DeleteOutlined,
  DeleteRowOutlined,
  EditOutlined,
  FieldNumberOutlined,
  InsertRowAboveOutlined,
  NumberOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  PullRequestOutlined,
  SearchOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type {
  DropdownProps,
  InputRef,
  MenuProps,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { TablePaginationConfig } from "antd/lib";
import { FilterValue, SorterResult } from "antd/lib/table/interface";

type DataIndex = keyof DataType;

interface DataType {
  key: React.Key;
  category: string;
  startDate: string;
  weight: string;
  set1: string;
  set2: string;
  set3: string;
  set4: string;
  set5: string;
  set6: string;
  restTime1: string;
  restTime2: string;
  restTime3: string;
  restTime4: string;
  restTime5: string;
  restTime6: string;
  status: string;
  total: number;
}

const { Title, Text } = Typography;

const CloudExampleEditTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`필터 검색`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            검색
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            초기화
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            적용
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            취소
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
      rowScope: "row",
      fixed: "left",
    },
    {
      title: "종류",
      width: 150,
      dataIndex: "category",
      key: "category",
      fixed: "left",

      filters: [
        {
          text: "턱걸이",
          value: "턱걸이",
        },
        {
          text: "A/B 슬라이드",
          value: "A/B 슬라이드",
        },
      ],
      filterMode: "tree",
      filterSearch: true,

      onFilter: (value, record) => record.category.startsWith(value as string),
    },
    {
      title: "수행 날짜",
      width: 150,
      dataIndex: "startDate",
      key: "startDate",
      fixed: "left",
      ...getColumnSearchProps("startDate"),
    },
    {
      title: "중량",
      width: 100,
      dataIndex: "weight",
      key: "weight",
      fixed: "left",
      ...getColumnSearchProps("weight"),
      ellipsis: true,
    },
    {
      title: "1세트",
      dataIndex: "set1",
      key: "set1",
      width: 100,
      ellipsis: true,
    },
    {
      title: "휴식",
      dataIndex: "restTime1",
      key: "restTime1",
      // width: 120,
      ellipsis: true,
    },
    {
      title: "2세트",
      dataIndex: "set2",
      key: "set2",
      width: 100,
      ellipsis: true,
    },
    {
      title: "휴식",
      dataIndex: "restTime2",
      key: "restTime2",
      width: 120,
      ellipsis: true,
    },
    {
      title: "3세트",
      dataIndex: "set3",
      key: "set3",
      width: 100,
      ellipsis: true,
    },
    {
      title: "휴식",
      dataIndex: "restTime3",
      key: "restTime3",
      width: 120,
      ellipsis: true,
    },
    {
      title: "4세트",
      dataIndex: "set4",
      key: "set4",
      width: 100,
      ellipsis: true,
    },
    {
      title: "휴식",
      dataIndex: "restTime4",
      key: "restTime4",
      width: 120,
      ellipsis: true,
    },
    {
      title: "5세트",
      dataIndex: "set5",
      key: "set5",
      width: 100,
      ellipsis: true,
    },
    {
      title: "휴식",
      dataIndex: "restTime5",
      key: "restTime5",
      width: 120,
      ellipsis: true,
    },
    {
      title: "6세트",
      dataIndex: "set6",
      key: "set6",
      width: 100,
      ellipsis: true,
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      width: 120,
      fixed: "right",
      filters: [
        {
          text: "매우 쉬움",
          value: "매우 쉬움",
        },
        {
          text: "쉬움",
          value: "쉬움",
        },
        {
          text: "보통",
          value: "보통",
        },
        {
          text: "어려움",
          value: "어려움",
        },
        {
          text: "매우 어려움",
          value: "매우 어려움",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value as string),
      ellipsis: true,
    },
    {
      title: "총합",
      dataIndex: "total",
      key: "7",
      width: 100,
      fixed: "right",
      ...getColumnSearchProps("total"),
      ellipsis: true,
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

  const data: DataType[] = [
    {
      key: 1,
      category: "A/B 슬라이드",
      startDate: "2024-04-07",
      weight: "0kg",
      set1: "10",
      restTime1: "0:30",
      set2: "10",
      restTime2: "0:30",
      set3: "10",
      restTime3: "",
      set4: "",
      restTime4: "",
      set5: "",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 30,
      status: "보통",
    },
    {
      key: 2,
      category: "턱걸이",
      startDate: "2024-04-09",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "10",
      restTime2: "0:30",
      set3: "4",
      restTime3: "0:30",
      set4: "5",
      restTime4: "0:30",
      set5: "2",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 33,
      status: "어려움",
    },
    {
      key: 3,
      category: "턱걸이",
      startDate: "2024-04-11",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "6",
      restTime3: "0:30",
      set4: "4",
      restTime4: "0:30",
      set5: "2",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 36,
      status: "어려움",
    },
    {
      key: 4,
      category: "턱걸이",
      startDate: "2024-04-15",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "5",
      restTime3: "0:30",
      set4: "3",
      restTime4: "0:30",
      set5: "3",
      restTime5: "0:30",
      set6: "2",
      restTime6: "",
      total: 37,
      status: "매우 어려움",
    },
    {
      key: 5,
      category: "A/B 슬라이드",
      startDate: "2024-04-15",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "12",
      restTime3: "",
      set4: "",
      restTime4: "",
      set5: "",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 36,
      status: "어려움",
    },
    {
      key: 6,
      category: "A/B 슬라이드",
      startDate: "2024-04-21",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "12",
      restTime3: "",
      set4: "",
      restTime4: "",
      set5: "",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 36,
      status: "보통",
    },
    {
      key: 7,
      category: "턱걸이",
      startDate: "2024-04-26",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "9",
      restTime2: "0:30",
      set3: "6",
      restTime3: "0:30",
      set4: "4",
      restTime4: "0:30",
      set5: "4",
      restTime5: "0:30",
      set6: "2",
      restTime6: "",
      total: 37,
      status: "매우 어려움",
    },
    {
      key: 8,
      category: "A/B 슬라이드",
      startDate: "2024-04-26",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "12",
      restTime3: "",
      set4: "",
      restTime4: "",
      set5: "",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 36,
      status: "매우 어려움",
    },
    {
      key: 9,
      category: "A/B 슬라이드",
      startDate: "2024-04-28",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "12",
      restTime3: "",
      set4: "",
      restTime4: "",
      set5: "",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 36,
      status: "보통",
    },
    {
      key: 10,
      category: "A/B 슬라이드",
      startDate: "2024-04-29",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "12",
      restTime3: "",
      set4: "",
      restTime4: "",
      set5: "",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 36,
      status: "매우 어려움",
    },
    {
      key: 11,
      category: "A/B 슬라이드",
      startDate: "2024-04-30",
      weight: "0kg",
      set1: "12",
      restTime1: "0:30",
      set2: "12",
      restTime2: "0:30",
      set3: "12",
      restTime3: "",
      set4: "",
      restTime4: "",
      set5: "",
      restTime5: "",
      set6: "",
      restTime6: "",
      total: 36,
      status: "어려움",
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
      ? { x: "max-content", y: "calc(55vh - 50px)" }
      : { x: 550, y: "calc(55vh - 50px)" }
  );

  // 필터 초기화
  type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
  type Filters = Parameters<OnChange>[1];

  type GetSingle<T> = T extends (infer U)[] ? U : never;
  type Sorts = GetSingle<Parameters<OnChange>[2]>;

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  // //필터 초기화

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
      setScroll({ x: 0, y: "calc(55vh - 50px)" });
    } else {
      setScroll({ x: "max-content", y: "calc(55vh - 50px)" });
    }
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
        style={{ height: "55vh" }}
        bordered={bordered}
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          type: "checkbox",
        }}
        onChange={onChange}
        // scroll={{ x: "max-content", y: "calc(55vh - 50px)" }}
        scroll={scroll}
        size={size}
      />
    </>
  );
};

export default CloudExampleEditTable;
