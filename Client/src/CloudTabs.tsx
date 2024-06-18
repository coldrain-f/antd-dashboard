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

const CloudTabs: React.FC = () => {
  const [tabRecoilState, setTabRecoilState] = useRecoilState(tasktrekTabState);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = tabRecoilState.items.findIndex(
        (i) => i.key === active.id
      );
      const overIndex = tabRecoilState.items.findIndex(
        (i) => i.key === over?.id
      );
      setTabRecoilState({
        items: arrayMove(tabRecoilState.items, activeIndex, overIndex),
      });
    }
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "remove") {
      const removedItems = tabRecoilState.items.filter(
        (item) => item?.key !== targetKey
      );
      setTabRecoilState({ items: removedItems });
    }
  };

  const onTabClick = (
    key: string,
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    setTabRecoilState((prev) => ({
      items: [...prev.items],
      activeKey: key,
    }));
  };

  return (
    <Tabs
      hideAdd
      type="editable-card"
      items={tabRecoilState.items}
      activeKey={tabRecoilState.activeKey}
      onEdit={onEdit}
      onTabClick={onTabClick}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext
            items={tabRecoilState.items.map((i) => i.key)}
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
