import React from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Row,
  Segmented,
  Space,
  Statistic,
  StatisticProps,
  Typography,
} from "antd";

import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloudOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import CountUp from "react-countup";
import ColumnWithDataLabelsChart from "../component/charts/ColumnWithDataLabelsChart";
import { Color } from "bizcharts/lib/plots/core/dependents";
import TaskTrekBarChart from "./guide/TaskTrekBarChart";
import LineWithDataLabelsChart from "../component/charts/LineWithDataLabelsChart";

const CloudHomeV2: React.FC = () => {
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
            <Row>
              <Col span={24}>
                <ColumnWithDataLabelsChart />
              </Col>
            </Row>
          </Card>
        </Col>
        {/* 타임라인 */}
        <Col span={15}>
          <Card
            style={{ height: "100%" }}
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
        </Col>
      </Row>
    </>
  );
};

export default CloudHomeV2;
