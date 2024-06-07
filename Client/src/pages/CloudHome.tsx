import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Progress,
  Row,
  Segmented,
  Space,
  Timeline,
  Typography,
} from "antd";
import { ResponsivePie } from "@nivo/pie";
import { green, red, blue } from "@ant-design/colors";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloudOutlined,
  FormOutlined,
  LineChartOutlined,
  MoreOutlined,
  SettingOutlined,
  ToolOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

// Guide: https://nivo.rocks/pie/
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(219, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 288,
      },
      {
        x: "helicopter",
        y: 221,
      },
      {
        x: "boat",
        y: 84,
      },
      {
        x: "train",
        y: 291,
      },
      {
        x: "subway",
        y: 99,
      },
      {
        x: "bus",
        y: 118,
      },
      {
        x: "car",
        y: 291,
      },
      {
        x: "moto",
        y: 50,
      },
      {
        x: "bicycle",
        y: 241,
      },
      {
        x: "horse",
        y: 139,
      },
      {
        x: "skateboard",
        y: 183,
      },
      {
        x: "others",
        y: 237,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(169, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 129,
      },
      {
        x: "helicopter",
        y: 279,
      },
      {
        x: "boat",
        y: 57,
      },
      {
        x: "train",
        y: 73,
      },
      {
        x: "subway",
        y: 171,
      },
      {
        x: "bus",
        y: 64,
      },
      {
        x: "car",
        y: 252,
      },
      {
        x: "moto",
        y: 5,
      },
      {
        x: "bicycle",
        y: 161,
      },
      {
        x: "horse",
        y: 221,
      },
      {
        x: "skateboard",
        y: 85,
      },
      {
        x: "others",
        y: 218,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(198, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 261,
      },
      {
        x: "helicopter",
        y: 72,
      },
      {
        x: "boat",
        y: 284,
      },
      {
        x: "train",
        y: 157,
      },
      {
        x: "subway",
        y: 49,
      },
      {
        x: "bus",
        y: 212,
      },
      {
        x: "car",
        y: 259,
      },
      {
        x: "moto",
        y: 18,
      },
      {
        x: "bicycle",
        y: 228,
      },
      {
        x: "horse",
        y: 217,
      },
      {
        x: "skateboard",
        y: 128,
      },
      {
        x: "others",
        y: 218,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(97, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 124,
      },
      {
        x: "helicopter",
        y: 236,
      },
      {
        x: "boat",
        y: 64,
      },
      {
        x: "train",
        y: 248,
      },
      {
        x: "subway",
        y: 83,
      },
      {
        x: "bus",
        y: 234,
      },
      {
        x: "car",
        y: 193,
      },
      {
        x: "moto",
        y: 44,
      },
      {
        x: "bicycle",
        y: 41,
      },
      {
        x: "horse",
        y: 114,
      },
      {
        x: "skateboard",
        y: 79,
      },
      {
        x: "others",
        y: 275,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(85, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 84,
      },
      {
        x: "helicopter",
        y: 300,
      },
      {
        x: "boat",
        y: 84,
      },
      {
        x: "train",
        y: 195,
      },
      {
        x: "subway",
        y: 224,
      },
      {
        x: "bus",
        y: 97,
      },
      {
        x: "car",
        y: 25,
      },
      {
        x: "moto",
        y: 259,
      },
      {
        x: "bicycle",
        y: 36,
      },
      {
        x: "horse",
        y: 164,
      },
      {
        x: "skateboard",
        y: 43,
      },
      {
        x: "others",
        y: 33,
      },
    ],
  },
];

const MyResponsiveLine = () => (
  <div style={{ width: "100%", height: "387px" }}>
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
        legend: "transportation",
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

  return (
    <>
      <Row>
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
        <Col span={10}>
          <Card
            bordered={false}
            title={"타임라인"}
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
            <Timeline
              mode="alternate"
              items={[
                {
                  children: "Create a services site 2015-09-01",
                },
                {
                  children: "Solve initial network problems 2015-09-01",
                  color: "green",
                },
                {
                  dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
                  children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                },
                {
                  color: "red",
                  children: "Network problems being solved 2015-09-01",
                },
                {
                  children: "Create a services site 2015-09-01",
                },
                {
                  dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
                  children: "Technical testing 2015-09-01",
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={14}>
          <Card
            bordered={false}
            title="라인 차트"
            extra={<Button type="text" icon={<SettingOutlined />} />}
          >
            <MyResponsiveLine />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudHome;
