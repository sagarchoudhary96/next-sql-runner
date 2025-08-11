import { useCallback, useMemo, useReducer } from "react";
import { DEFAULT_EDITOR_TAB, HOME_TAB_ID } from "@/lib/constants";
import { v4 as uuid } from "uuid";
import { EditorTab, QueryEditorTabAction } from "@/lib/types";

type EditorTabsState = {
  [key: string]: EditorTab;
};

type EditorTabsAction =
  | { type: QueryEditorTabAction.QUERY_CHANGE; query: string; tabId: string }
  | { type: QueryEditorTabAction.ADD_TAB; activeTabId: string }
  | { type: QueryEditorTabAction.DELETE_TAB; tabId: string }
  | {
      type: QueryEditorTabAction.SWITCH_TAB;
      prevTabId: string;
      newTabId: string;
    };

function editorTabsReducer(
  state: EditorTabsState,
  action: EditorTabsAction
): EditorTabsState {
  switch (action.type) {
    case "QUERY_CHANGE":
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          query: action.query,
        },
      };
    case "ADD_TAB": {
      const newTabId = `editor_tab_${uuid()}`;
      const newTab: EditorTab = {
        name: `New Tab`,
        id: newTabId,
        value: newTabId,
        canDelete: true,
        isActive: true,
        query: "",
      };
      return {
        ...state,
        [newTabId]: newTab,
        [action.activeTabId]: {
          ...state[action.activeTabId],
          isActive: false,
        },
      };
    }
    case "DELETE_TAB": {
      const tabs = { ...state };
      const tabIds = Object.keys(tabs);
      const index = tabIds.indexOf(action.tabId);
      if (index > 0) {
        tabs[tabIds[index - 1]].isActive = true;
      }
      delete tabs[action.tabId];
      return tabs;
    }
    case "SWITCH_TAB":
      return {
        ...state,
        [action.prevTabId]: {
          ...state[action.prevTabId],
          isActive: false,
        },
        [action.newTabId]: {
          ...state[action.newTabId],
          isActive: true,
        },
      };
    default:
      return state;
  }
}

/**
 * Custom hook to handle QueryEditors State and Tabs
 */
export default function useActiveQueryEditor() {
  const [editorTabs, dispatch] = useReducer(editorTabsReducer, {
    [HOME_TAB_ID]: DEFAULT_EDITOR_TAB,
  });

  const activeEditorTab = useMemo(
    () => Object.values(editorTabs).find((tab) => tab.isActive === true),
    [editorTabs]
  );

  const handleQueryChange = useCallback(
    (queryVal: string) => {
      if (activeEditorTab) {
        dispatch({
          type: QueryEditorTabAction.QUERY_CHANGE,
          query: queryVal,
          tabId: activeEditorTab.id,
        });
      }
    },
    [activeEditorTab]
  );

  return {
    currentQuery: activeEditorTab?.query,
    handleQueryChange,
    editorTabs: Object.values(editorTabs),
    updateEditorTabs: dispatch,
    activeEditorTab,
  };
}
