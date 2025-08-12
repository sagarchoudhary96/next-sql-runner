export interface EditorTab {
  name: string;
  id: string;
  value: string;
  canDelete: boolean;
  query: string;
  isActive?: boolean;
}

export enum QueryEditorTabAction {
  QUERY_CHANGE = "QUERY_CHANGE",
  ADD_TAB = "ADD_TAB",
  DELETE_TAB = "DELETE_TAB",
  SWITCH_TAB = "SWITCH_TAB",
}

export type TableRowRecord = Record<string, string | number | boolean>;
export interface TableData {
  metadata: {
    tableName: string;
    columns: Array<{
      name: string;
      type: string;
    }>;
  };
  rows: TableRowRecord[];
}
export interface TablesDataMap {
  [tableName: string]: TableData;
}

export interface PredefinedQuery {
  name: string;
  query: string;
  description: string;
}
export interface SavedQuery {
  id: string;
  name: string;
  query: string;
}

export type EditorTabsAction =
  | { type: QueryEditorTabAction.QUERY_CHANGE; query: string; tabId: string }
  | { type: QueryEditorTabAction.ADD_TAB; activeTabId: string }
  | { type: QueryEditorTabAction.DELETE_TAB; tabId: string }
  | {
      type: QueryEditorTabAction.SWITCH_TAB;
      prevTabId: string;
      newTabId: string;
    };
