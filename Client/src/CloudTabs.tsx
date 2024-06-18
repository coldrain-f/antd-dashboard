import React, { useState } from "react";
import { Tabs } from "antd";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AntdContentsTable from "./AntdContentsTable";
import CloudExampleEditTable from "./CloudExampleEditTable";
import { useRecoilState } from "recoil";
import { tasktrekTabState } from "./recoil/tasktrekTabState";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "pointer", // move
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const initialItems = [
  { label: "운동 관리", key: "1", children: <CloudExampleEditTable /> },
  { label: "사용자 관리", key: "2", children: <AntdContentsTable /> },
];

const CloudTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [tabItems, setTabItems] = useState(initialItems);

  const [tabRecoilState, setTabRecoilState] = useRecoilState(tasktrekTabState);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setTabItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Tabs
      hideAdd
      type="editable-card"
      items={tabRecoilState.items}
      accessKey={activeKey}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext
            items={tabItems.map((i) => i.key)}
            strategy={horizontalListSortingStrategy}
          >
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode {...node.props} key={node.key}>
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
};

export default CloudTabs;
