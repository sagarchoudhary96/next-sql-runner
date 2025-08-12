"use client";
import useAppContext from "@/hooks/useAppContext";
import QueryEditor from "../QueryEditor";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useCallback, useState } from "react";
import { DEFAULT_STRINGS } from "@/lib/constants";
import { BarChart3Icon, Download, Server } from "lucide-react";
import EmptyState from "../EmptyState";
import { TableData } from "@/types";
import { toast } from "sonner";
import { Button } from "../ui/button";
import QueryResultTable from "../QueryResultTable";

const QueryPlayground = () => {
  const { allTables } = useAppContext();

  const [queryResults, setQueryResults] = useState<TableData>();

  /**
   * handles running the query selected by user and returns data for the query
   * and updating store/context if required */
  const handleOnQueryRun = useCallback(() => {
    if (!allTables) return;
    // returns random table data for all queries
    const tableNames = Object.keys(allTables);
    const tableName = tableNames[Math.floor(Math.random() * tableNames.length)];
    if (!tableName) {
      toast.error(DEFAULT_STRINGS.TOAST_QUERY_RUN_ERROR_MESSAGE);
    }
    setQueryResults(allTables[tableName]);
  }, [allTables]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden w-full gap-2">
      <div className="flex-1 flex flex-col overflow-hidden">
        {!queryResults ? (
          <EmptyState
            icon={<Server className="size-8" />}
            title={DEFAULT_STRINGS.WELCOME_MESSAGE_TITLE}
            subtitle={DEFAULT_STRINGS.WELCOME_MESSAGE_SUBTITLE}
          />
        ) : (
          <QueryResultTable tableData={queryResults} />
        )}
      </div>

      <div className="w-full">
        <QueryEditor onRunQuery={handleOnQueryRun} />
      </div>
    </div>
  );
};

export default QueryPlayground;
