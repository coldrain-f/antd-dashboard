import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import CloudLogin from "./pages/CloudLogin";
import CloudSignUp from "./pages/CloudSignUp";
import CloudMain from "./CloudMain";

import { antdRecoilState } from "./recoil/antdRecoilState";
import { useRecoilState } from "recoil";

import { ConfigProviderProps } from "antd/lib";
import koKR from "antd/locale/ko_KR";

/* <DatePicker /> 로케일 관련 Import */
import dayjs from "dayjs";
import "dayjs/locale/ko";

type Locale = ConfigProviderProps["locale"];

const App: React.FC = () => {
  const [antdState] = useRecoilState(antdRecoilState);
  const [locale] = useState<Locale>(koKR);

  // <DatePicker /> 로케일 설정
  dayjs.locale("ko");

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          // colorPrimary: "#00B96B",
          colorPrimary: "#334155",
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
