import { atom } from "recoil";

export interface AntdStateType {
  collapsed: boolean;
}

export const antdSiderState = atom<AntdStateType>({
  key: "antdSiderState",
  default: { collapsed: false },
});
