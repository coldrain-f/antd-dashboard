import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./style.css";
import {
  CellClassParams,
  ColDef,
  GetRowIdParams,
  GridApi,
  ICellRendererParams,
  IRowNode,
  ModuleRegistry,
  RefreshCellsParams,
  RowDragEndEvent,
  RowDragLeaveEvent,
  RowDragMoveEvent,
  ValueFormatterParams,
} from "@ag-grid-community/core";
import { getData } from "./data";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

var valueFormatter = function (params: ValueFormatterParams) {
  return params.value ? params.value + " MB" : "";
};

var cellClassRules = {
  "hover-over": (params: CellClassParams) => {
    return params.node === potentialParent;
  },
};

var potentialParent: any = null;

function moveToPath(
  newParentPath: string[],
  node: IRowNode,
  allUpdatedNodes: any[]
) {
  // last part of the file path is the file name
  var oldPath = node.data.filePath;
  var fileName = oldPath[oldPath.length - 1];
  var newChildPath = newParentPath.slice();
  newChildPath.push(fileName);
  node.data.filePath = newChildPath;
  allUpdatedNodes.push(node.data);
  if (node.childrenAfterGroup) {
    node.childrenAfterGroup.forEach((childNode) => {
      moveToPath(newChildPath, childNode, allUpdatedNodes);
    });
  }
}

function isSelectionParentOfTarget(selectedNode: IRowNode, targetNode: any) {
  var children = selectedNode.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
}

function arePathsEqual(path1: string[], path2: string[]) {
  if (path1.length !== path2.length) {
    return false;
  }
  var equal = true;
  path1.forEach(function (item, index) {
    if (path2[index] !== item) {
      equal = false;
    }
  });
  return equal;
}

function setPotentialParentForNode(
  api: GridApi,
  overNode: IRowNode | undefined | null
) {
  var newPotentialParent;
  if (overNode) {
    newPotentialParent =
      overNode.data.type === "folder"
        ? // if over a folder, we take the immediate row
          overNode
        : // if over a file, we take the parent row (which will be a folder)
          overNode.parent;
  } else {
    newPotentialParent = null;
  }
  var alreadySelected = potentialParent === newPotentialParent;
  if (alreadySelected) {
    return;
  }
  // we refresh the previous selection (if it exists) to clear
  // the highlighted and then the new selection.
  var rowsToRefresh = [];
  if (potentialParent) {
    rowsToRefresh.push(potentialParent);
  }
  if (newPotentialParent) {
    rowsToRefresh.push(newPotentialParent);
  }
  potentialParent = newPotentialParent;
  refreshRows(api, rowsToRefresh);
}

function refreshRows(api: GridApi, rowsToRefresh: IRowNode[]) {
  var params: RefreshCellsParams = {
    // refresh these rows only.
    rowNodes: rowsToRefresh,
    // because the grid does change detection, the refresh
    // will not happen because the underlying value has not
    // changed. to get around this, we force the refresh,
    // which skips change detection.
    force: true,
  };
  api.refreshCells(params);
}

class FileCellRenderer {
  private eGui!: any;

  init(params: ICellRendererParams) {
    var tempDiv = document.createElement("div");
    var value = params.value;
    var icon = this.getFileIcon(params.value);
    tempDiv.innerHTML = icon
      ? '<i class="' +
        icon +
        '"/>' +
        '<span class="filename">' +
        value +
        "</span>"
      : value;
    this.eGui = tempDiv.firstChild!;
  }
  getGui() {
    return this.eGui;
  }

  getFileIcon(filename: string) {
    return filename.endsWith(".mp3") || filename.endsWith(".wav")
      ? "far fa-file-audio"
      : filename.endsWith(".xls")
      ? "far fa-file-excel"
      : filename.endsWith(".txt")
      ? "far fa-file"
      : filename.endsWith(".pdf")
      ? "far fa-file-pdf"
      : "far fa-folder";
  }
}

const TaskSampleGrid = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "dateModified",
      cellClassRules: cellClassRules,
    },
    {
      field: "size",
      valueFormatter: valueFormatter,
      cellClassRules: cellClassRules,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);
  const getDataPath = useCallback((data: any) => {
    return data.filePath;
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id;
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      rowDrag: true,
      headerName: "Files",
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: FileCellRenderer,
      },
      cellClassRules: {
        "hover-over": (params) => {
          return params.node === potentialParent;
        },
      },
    };
  }, []);

  const onRowDragMove = useCallback((event: RowDragMoveEvent) => {
    setPotentialParentForNode(event.api, event.overNode);
  }, []);

  const onRowDragLeave = useCallback((event: RowDragLeaveEvent) => {
    // clear node to highlight
    setPotentialParentForNode(event.api, null);
  }, []);

  const onRowDragEnd = useCallback(
    (event: RowDragEndEvent) => {
      if (!potentialParent) {
        return;
      }
      var movingData = event.node.data;
      // take new parent path from parent, if data is missing, means it's the root node,
      // which has no data.
      var newParentPath = potentialParent.data
        ? potentialParent.data.filePath
        : [];
      var needToChangeParent = !arePathsEqual(
        newParentPath,
        movingData.filePath
      );
      // check we are not moving a folder into a child folder
      var invalidMode = isSelectionParentOfTarget(event.node, potentialParent);
      if (invalidMode) {
        console.log("invalid move");
      }
      if (needToChangeParent && !invalidMode) {
        var updatedRows: any[] = [];
        moveToPath(newParentPath, event.node, updatedRows);
        gridRef.current!.api.applyTransaction({
          update: updatedRows,
        });
        gridRef.current!.api.clearFocusedCell();
      }
      // clear node to highlight
      setPotentialParentForNode(event.api, null);
    },
    [potentialParent]
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          treeData={true}
          groupDefaultExpanded={-1}
          getDataPath={getDataPath}
          getRowId={getRowId}
          autoGroupColumnDef={autoGroupColumnDef}
          onRowDragMove={onRowDragMove}
          onRowDragLeave={onRowDragLeave}
          onRowDragEnd={onRowDragEnd}
        />
      </div>
    </div>
  );
};

export default TaskSampleGrid;
