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
import LineWithDataLabelsChart from "../component/charts/LineWithDataLabelsChart";
import ColumnWithDataLabelsChart from "../component/charts/ColumnWithDataLabelsChart";

const CloudHomeV3: React.FC = () => {
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
      <Flex gap={10}>
        {/* 할 일 Statistic */}
        <Card
          style={{ height: "100%", width: "30%" }}
          title="나의 할 일"
          extra={
            <Space>
              <Button type="text" icon={<SettingOutlined />} />
            </Space>
          }
          bordered={false}
        >
          <Space>
            <Card>
              <Statistic
                title="해야 할 일"
                value={64}
                formatter={formatter}
                suffix="개"
              />
            </Card>

            <Card>
              <Statistic
                title="진행중"
                value={127}
                formatter={formatter}
                suffix="개"
              />
            </Card>

            <Card>
              <Statistic
                title="완료"
                value={30}
                formatter={formatter}
                suffix="개"
              />
            </Card>
          </Space>
          <ColumnWithDataLabelsChart />
        </Card>

        {/* 타임라인 */}
        <Card
          style={{ height: "100%", width: "70%" }}
          bordered={false}
          title="타임라인"
          extra={
            <Space>
              <DatePicker picker="year" />
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

export default CloudHomeV3;
