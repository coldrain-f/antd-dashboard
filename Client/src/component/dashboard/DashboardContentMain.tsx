import React from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Row,
  Space,
  Statistic,
  StatisticProps,
  Typography,
} from "antd";

import { CloudOutlined, SettingOutlined } from "@ant-design/icons";

import CountUp from "react-countup";

import dayjs from "dayjs";
import LineWithDataLabelsChart from "../charts/LineWithDataLabelsChart";
import ColumnWithDataLabelsChart from "../charts/ColumnWithDataLabelsChart";
import TodoBarChart from "../charts/TodoBarChart";

const DashboardContentMain: React.FC = () => {
  const { Title, Text } = Typography;
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  return (
    <>
      <Flex>
        <Flex style={{ width: "775px" }}>
          <Typography>
            <Title
              level={2}
              style={{
                display: "inline-block",
                borderBottom: "3px solid #15803d",
                cursor: "default",
              }}
            >
              관리자
            </Title>
            <Title
              level={3}
              style={{
                display: "inline-block",
                fontWeight: "normal",
                cursor: "default",
              }}
            >
              님, 안녕하세요!
            </Title>
          </Typography>
        </Flex>
        <Flex
          justify="end"
          align="center"
          style={{ width: "791px", paddingRight: 32 }}
        >
          <Typography>
            <Space>
              <Text style={{ cursor: "default" }}>미세먼지 보통</Text>
              <Divider type="vertical" />
              <Text style={{ cursor: "default" }}>28°</Text>
              <Text>
                <CloudOutlined />
              </Text>
            </Space>
          </Typography>
        </Flex>
      </Flex>
      <Divider />
      <Flex justify="start">
        {/* 할 일 Statistic */}

        <Card
          title="나의 할 일"
          extra={
            <Space>
              <Button type="text" icon={<SettingOutlined />} />
            </Space>
          }
          bordered={false}
        >
          <Row gutter={8} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="해야 할 일"
                  value={64}
                  formatter={formatter}
                  suffix="개"
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card>
                <Statistic
                  title="진행중"
                  value={127}
                  formatter={formatter}
                  suffix="개"
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card>
                <Statistic
                  title="완료"
                  value={30}
                  formatter={formatter}
                  suffix="개"
                />
              </Card>
            </Col>
          </Row>

          <ColumnWithDataLabelsChart />
          {/* <TodoBarChart /> */}
        </Card>

        {/* 타임라인 */}
        <Card
          style={{ width: "958px", height: "100%", marginLeft: 10 }}
          bordered={false}
          title="타임라인"
          extra={
            <Space>
              <DatePicker
                picker="year"
                defaultValue={dayjs("2024-01-01", "YYYY-MM-DD")}
              />
              <Button type="text" icon={<SettingOutlined />} />
            </Space>
          }
        >
          <LineWithDataLabelsChart />
        </Card>
      </Flex>
    </>
  );
};

export default DashboardContentMain;
