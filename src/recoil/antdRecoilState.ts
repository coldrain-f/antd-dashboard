import { MappingAlgorithm, theme } from "antd";
import { atom } from "recoil";

export interface AntdStateType {
  algorithm: MappingAlgorithm[];
  isDarkMode: Boolean;
  isCompactMode: Boolean;
}

export const antdRecoilState = atom<AntdStateType>({
  key: "antdRecoilState",
  default: {
    algorithm: [theme.defaultAlgorithm],
    isDarkMode: false,
    isCompactMode: false,
  },
});
