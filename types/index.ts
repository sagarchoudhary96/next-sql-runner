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

export interface TableData {
  [tableName: string]: {
    metadata: {
      tableName: string;
      columns: Array<{
        name: string;
        type: string;
      }>;
    };
    rows: Array<Record<string, string | number | boolean>>;
  };
}

export interface PredefinedQuery {
  name: string;
  query: string;
  description: string;
}