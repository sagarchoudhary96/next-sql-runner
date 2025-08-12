"use client";

import useAppContext from "@/hooks/useAppContext";
import { DEFAULT_STRINGS } from "@/lib/constants";
import { ChevronRight, Columns3, Table2Icon } from "lucide-react";
import { useMemo } from "react";
import EmptyState from "../EmptyState";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TableSchemaItems = () => {
  // hook to fetch data from context
  const { allTables } = useAppContext();

  // creates list of sidebars items to be shown
  // returns Array of tables metadata info
  const tableItems = useMemo(
    () =>
      !allTables
        ? []
        : Object.keys(allTables).map(
            (tableName) => allTables[tableName].metadata
          ),
    [allTables]
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-md font-semibold">
        {DEFAULT_STRINGS.HEADING_TABLES_SCHEMA}
      </SidebarGroupLabel>
      {tableItems.length === 0 ? (
        <EmptyState
          title={DEFAULT_STRINGS.NO_TABLES_EXIST}
          subtitle={DEFAULT_STRINGS.IMPORT_NEW_DATA_MESSAGE}
        />
      ) : (
        <SidebarMenu>
          {tableItems.map((item) => (
            <Collapsible
              key={item.tableName}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.tableName}>
                    <Table2Icon />
                    <span className="font-medium">{item.tableName}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mt-2">
                    <span className="text-xs font-semibold text-sidebar-foreground/70">
                      {DEFAULT_STRINGS.HEADING_COLUMNS}
                    </span>
                    {item.columns.map((column, index) => (
                      <SidebarMenuSubItem
                        key={`${item.tableName}-${column.name}-${index}-column`}
                      >
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <SidebarMenuSubButton className="text-ellipsis overflow-hidden whitespace-nowrap w-full">
                              <Columns3 />
                              <span className="font-medium">{`${column.name} (${column.type})`}</span>
                            </SidebarMenuSubButton>
                          </TooltipTrigger>
                          <TooltipContent>{`${column.name} (${column.type})`}</TooltipContent>
                        </Tooltip>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      )}
    </SidebarGroup>
  );
};

export default TableSchemaItems;
