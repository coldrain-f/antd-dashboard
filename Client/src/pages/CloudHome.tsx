import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Segmented,
  Space,
  Statistic,
  StatisticProps,
  Typography,
} from "antd";

import {
  CloudOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import CountUp from "react-countup";

// Guide: https://nivo.rocks/pie/
import { ResponsiveLine } from "@nivo/line";
import TaskTrekBarChart from "./guide/TaskTrekBarChart";

const data = [
  {
    id: "해야 할 일",
    color: "hsl(219, 70%, 50%)",
    data: [
      { x: "1월", y: Math.floor(Math.random() * 300) },
      { x: "2월", y: Math.floor(Math.random() * 300) },
      { x: "3월", y: Math.floor(Math.random() * 300) },
      { x: "4월", y: Math.floor(Math.random() * 300) },
      { x: "5월", y: Math.floor(Math.random() * 300) },
      { x: "6월", y: Math.floor(Math.random() * 300) },
      { x: "7월", y: Math.floor(Math.random() * 300) },
      { x: "8월", y: Math.floor(Math.random() * 300) },
      { x: "9월", y: Math.floor(Math.random() * 300) },
      { x: "10월", y: Math.floor(Math.random() * 300) },
      { x: "11월", y: Math.floor(Math.random() * 300) },
      { x: "12월", y: Math.floor(Math.random() * 300) },
    ],
  },
  {
    id: "진행중",
    color: "hsl(169, 70%, 50%)",
    data: [
      { x: "1월", y: Math.floor(Math.random() * 300) },
      { x: "2월", y: Math.floor(Math.random() * 300) },
      { x: "3월", y: Math.floor(Math.random() * 300) },
      { x: "4월", y: Math.floor(Math.random() * 300) },
      { x: "5월", y: Math.floor(Math.random() * 300) },
      { x: "6월", y: Math.floor(Math.random() * 300) },
      { x: "7월", y: Math.floor(Math.random() * 300) },
      { x: "8월", y: Math.floor(Math.random() * 300) },
      { x: "9월", y: Math.floor(Math.random() * 300) },
      { x: "10월", y: Math.floor(Math.random() * 300) },
      { x: "11월", y: Math.floor(Math.random() * 300) },
      { x: "12월", y: Math.floor(Math.random() * 300) },
    ],
  },
  {
    id: "완료",
    color: "hsl(198, 70%, 50%)",
    data: [
      { x: "1월", y: Math.floor(Math.random() * 300) },
      { x: "2월", y: Math.floor(Math.random() * 300) },
      { x: "3월", y: Math.floor(Math.random() * 300) },
      { x: "4월", y: Math.floor(Math.random() * 300) },
      { x: "5월", y: Math.floor(Math.random() * 300) },
      { x: "6월", y: Math.floor(Math.random() * 300) },
      { x: "7월", y: Math.floor(Math.random() * 300) },
      { x: "8월", y: Math.floor(Math.random() * 300) },
      { x: "9월", y: Math.floor(Math.random() * 300) },
      { x: "10월", y: Math.floor(Math.random() * 300) },
      { x: "11월", y: Math.floor(Math.random() * 300) },
      { x: "12월", y: Math.floor(Math.random() * 300) },
    ],
  },
];

const MyResponsiveLine = () => (
  <div style={{ width: "100%", height: "470px" }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
);

const CloudHome: React.FC = () => {
  const { Title, Text } = Typography;
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
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
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        {/* 할 일 Statistic */}
        <Col span={9}>
          <Card
            style={{ height: "100%" }}
            title="할 일"
            extra={<Button type="text" icon={<SettingOutlined />} />}
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
            <Row>
              <Col span={24}>
                <TaskTrekBarChart />
              </Col>
            </Row>
          </Card>
        </Col>
        {/* 타임라인 */}
        <Col span={15}>
          <Card
            style={{ height: "100%" }}
            bordered={false}
            title="완료 타임라인"
            extra={
              <Segmented<string>
                options={[
                  {
                    label: "전체",
                    value: "ALL",
                    icon: <UnorderedListOutlined />,
                  },
                  {
                    label: "할 일",
                    value: "Todo",
                    icon: <></>,
                  },
                  { label: "메모", value: "Memo", icon: <></> },
                  {
                    label: "일정",
                    value: "Plan",
                    icon: <></>,
                  },
                ]}
                onChange={(value) => {
                  console.log(value); // string
                }}
              />
            }
          >
            <MyResponsiveLine />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudHome;
