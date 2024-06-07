import React from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import { ResponsivePie } from "@nivo/pie";

// Guide: https://nivo.rocks/pie/

const MyResponsivePie = () => {
  const data = [
    {
      id: "java",
      label: "java",
      value: 448,
      color: "hsl(350, 70%, 50%)",
    },
    {
      id: "scala",
      label: "scala",
      value: 398,
      color: "hsl(99, 70%, 50%)",
    },
    {
      id: "php",
      label: "php",
      value: 117,
      color: "hsl(241, 70%, 50%)",
    },
    {
      id: "sass",
      label: "sass",
      value: 178,
      color: "hsl(209, 70%, 50%)",
    },
    {
      id: "haskell",
      label: "haskell",
      value: 304,
      color: "hsl(322, 70%, 50%)",
    },
  ];
  return (
    <>
      <div style={{ width: "100%", height: "350px" }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 12,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

const CloudHome: React.FC = () => {
  const { Title } = Typography;

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography>
            <Title level={2} style={{ display: "inline-block" }}>
              홍길동
            </Title>
            <Title
              level={3}
              style={{ display: "inline-block", fontWeight: "normal" }}
            >
              님, 안녕하세요!
            </Title>
          </Typography>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <MyResponsivePie />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudHome;
