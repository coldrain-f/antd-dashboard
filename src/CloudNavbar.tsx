import {
  BellOutlined,
  CompressOutlined,
  DashboardOutlined,
  LoginOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Menu,
  MenuProps,
  Popover,
  Row,
  Space,
  Tooltip,
  theme,
} from "antd";
import { useNavigate } from "react-router-dom";

import { antdRecoilState } from "./recoil/antdRecoilState";
import { useRecoilState } from "recoil";

const CloudProfileContent: React.FC = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Button
        block
        type="text"
        style={{ textAlign: "start" }}
        icon={<UserOutlined />}
      >
        내 정보
      </Button>
      <Button
        block
        type="text"
        style={{ textAlign: "start" }}
        icon={<DashboardOutlined />}
      >
        대시보드
      </Button>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <Button block icon={<LoginOutlined />} onClick={onLogout}>
        로그아웃
      </Button>
    </>
  );
};

const CloudNavbar: React.FC = () => {
  const items: MenuProps["items"] = [
    { key: 1, label: "Home" },
    { key: 2, label: "Admin" },
  ];

  const [antdState, setAntdState] = useRecoilState(antdRecoilState);

  const toggleDarkMode = () => {
    if (antdState.isDarkMode) {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isCompactMode ? [theme.compactAlgorithm] : [],
        isDarkMode: false,
      }));
    } else {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isCompactMode
          ? [theme.compactAlgorithm, theme.darkAlgorithm]
          : [theme.darkAlgorithm],
        isDarkMode: true,
      }));
    }
  };

  const toggleCompactMode = () => {
    if (antdState.isCompactMode) {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isDarkMode ? [theme.darkAlgorithm] : [],
        isCompactMode: false,
      }));
    } else {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isDarkMode
          ? [theme.darkAlgorithm, theme.compactAlgorithm]
          : [theme.compactAlgorithm],
        isCompactMode: true,
      }));
    }
  };

  return (
    <>
      <Row>
        <Col span={21}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Col>
        <Col
          span={3}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Space>
            <a href="#">
              <Avatar
                icon={antdState.isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleDarkMode}
              />
            </a>
            <a href="#">
              <Avatar icon={<CompressOutlined />} onClick={toggleCompactMode} />
            </a>

            <a href="#">
              <Tooltip placement="bottom" title={"설정"} arrow>
                <Avatar icon={<SettingOutlined />} />
              </Tooltip>
            </a>
            <a href="#">
              <Tooltip placement="bottom" title={"알림"} arrow>
                <Avatar icon={<BellOutlined />} />
              </Tooltip>
            </a>
            <Popover
              placement="bottomRight"
              title={"프로필"}
              content={<CloudProfileContent />}
              trigger={"click"}
              overlayStyle={{ width: "12vw" }}
            >
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                  cursor: "pointer",
                  marginLeft: "12px",
                }}
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                icon={<UserOutlined />}
              />
            </Popover>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default CloudNavbar;
