import { DEFAULT_STRINGS, HOME_TAB_ID } from "@/lib/constants";
import { EditorTab, EditorTabsAction, QueryEditorTabAction } from "@/types";
import { HomeIcon, PlusIcon, StickyNote, XIcon } from "lucide-react";
import { ActionDispatch, useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface EditorTabsProps {
  tabs: EditorTab[];
  onUpdateTabs: ActionDispatch<[action: EditorTabsAction]>;
  activeTab?: string;
}
const EditorTabs = ({ tabs, onUpdateTabs, activeTab }: EditorTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id);

  useEffect(() => {
    if (!activeTab) return;
    setSelectedTab(activeTab);
  }, [activeTab]);

  const onDeleteTab = useCallback(
    (tabId: string) => {
      if (tabs.length === 1) {
        return;
      }
      onUpdateTabs({ type: QueryEditorTabAction.DELETE_TAB, tabId });
    },
    [tabs, onUpdateTabs]
  );

  const onAddTab = useCallback(() => {
    onUpdateTabs({
      type: QueryEditorTabAction.ADD_TAB,
      activeTabId: selectedTab,
    });
  }, [selectedTab, onUpdateTabs]);

  const onTabChange = useCallback(
    (tabId: string) => {
      onUpdateTabs({
        type: QueryEditorTabAction.SWITCH_TAB,
        prevTabId: selectedTab,
        newTabId: tabId,
      });
      setSelectedTab(tabId);
    },
    [selectedTab, onUpdateTabs]
  );

  return (
    <div className="flex items-center justify-between flex-1 gap-2 overflow-hidden">
      <Tabs
        value={selectedTab}
        onValueChange={onTabChange}
        className="flex-1 overflow-hidden"
      >
        <ScrollArea>
          <TabsList className="h-14 gap-2 p-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 border cursor-pointer font-semibold"
              >
                {tab.id === HOME_TAB_ID ? (
                  <HomeIcon className="w-4 h-4" />
                ) : (
                  <StickyNote className="w-4 h-4" />
                )}
                {tab.name}
                <div>
                  {tab.canDelete && (
                    <Button
                      variant="ghost"
                      className="!p-2 hover:bg-transparent dark:hover:bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTab(tab.id);
                      }}
                    >
                      <XIcon />
                    </Button>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
      <Button variant="outline" onClick={onAddTab}>
        <PlusIcon />
        <span className="hidden sm:inline">{DEFAULT_STRINGS.NEW_TAB}</span>
      </Button>
    </div>
  );
};

export default EditorTabs;
