import React from "react";
import { atom } from "recoil";

interface ItemType {
  label: React.ReactNode;
  children: JSX.Element;
  key: string;
}

export interface AntdStateType {
  items: ItemType[];
  activeKey?: string;
}

export const tasktrekTabState = atom<AntdStateType>({
  key: "tasktrekTabState",
  default: {
    items: [],
  },
});
