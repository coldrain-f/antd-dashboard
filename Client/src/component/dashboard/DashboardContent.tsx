import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import DashboardContentTabs from "./DashboardContentTabs";
import DashboardContentMain from "./DashboardContentMain";

import { useRecoilState } from "recoil";
import { tasktrekTabState } from "../../recoil/tasktrekTabState";
import DashboardContentMainTwo from "./DashboardContentMainTwo";

const DashboardContent: React.FC = () => {
  const [tabRecoilState] = useRecoilState(tasktrekTabState);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        overflow: "auto",
        padding: 24,
        margin: 0,
        // marginRight: "58px",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {tabRecoilState.items.length ? (
        <DashboardContentTabs />
      ) : (
        <DashboardContentMainTwo />
      )}
    </Content>
  );
};

export default DashboardContent;
