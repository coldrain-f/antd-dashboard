import {
  DashboardOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Popover } from "antd";
import { useNavigate } from "react-router-dom";

const DashboardNavbarProfile: React.FC = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
  };

  return (
    <Popover
      placement="bottomRight"
      title={"프로필"}
      content={
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
      }
      trigger={"click"}
      overlayStyle={{ width: "12vw" }}
    >
      <Avatar
        style={{
          backgroundColor: "#87d068",
          cursor: "pointer",
          marginLeft: "12px",
        }}
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        icon={<UserOutlined />}
      />
    </Popover>
  );
};

export default DashboardNavbarProfile;
