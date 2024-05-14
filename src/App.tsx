import React from "react";
import { ConfigProvider } from "antd";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CloudMain from "./CloudMain";
import CloudLogin from "./CloudLogin";
import CloudSignUp from "./CloudSignUp";

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00B96B",
          fontFamily: "Noto Sans KR",
          fontSize: 14, // default
        },
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
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
