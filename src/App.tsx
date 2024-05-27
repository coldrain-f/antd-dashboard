import React from "react";
import { ConfigProvider } from "antd";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CloudMain from "./CloudMain";
import CloudLogin from "./CloudLogin";
import CloudSignUp from "./CloudSignUp";

import { antdRecoilState } from "./recoil/antdRecoilState";
import { useRecoilState } from "recoil";

const App: React.FC = () => {
  const [antdState] = useRecoilState(antdRecoilState);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00B96B",
          fontFamily: "Noto Sans KR",
          fontSize: 14, // default
        },
        algorithm: antdState.algorithm,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CloudLogin />}></Route>
          <Route path="/join" element={<CloudSignUp />}></Route>
          <Route path="/dashboard/*" element={<CloudMain />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
