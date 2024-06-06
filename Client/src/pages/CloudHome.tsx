import React from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { PieChart } from "bizcharts";

const CloudHome: React.FC = () => {
  const data = [
    {
      type: "할 일",
      value: 27,
    },
  ];

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <PieChart
              width={350}
              height={300}
              data={data}
              title={{
                visible: true,
                text: "타이틀", //饼图-外部图形标签(outer label)
              }}
              description={{
                visible: true,
                text: "내용",
              }}
              radius={0.5}
              angleField="value"
              colorField="type"
              label={{
                visible: true,
                type: "spider",
                labelHeight: 28,
                content: (v) => `${v.type}\n${v.value}`,
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CloudHome;
