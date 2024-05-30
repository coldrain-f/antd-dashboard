import React, { useRef, useState } from "react";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

type DataIndex = keyof DataType;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

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
          placeholder={`${dataIndex} 검색`}
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
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
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
      title: "이름",
      width: 150,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "나이",
      width: 100,
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.age - b.age,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Column 4",
      dataIndex: "address",
      key: "4",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Column 5",
      dataIndex: "address",
      key: "5",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Column 6",
      dataIndex: "address",
      key: "6",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Column 7",
      dataIndex: "address",
      key: "7",
      width: 200,
      ...getColumnSearchProps("address"),
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <Button icon={<EditOutlined />}>편집</Button>,
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: i + 1,
      address: `London Park no. ${i}`,
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={{
        type: "checkbox",
      }}
      scroll={{ x: "max-content", y: 550 }}
    />
  );
};

export default CloudExampleEditTable;
