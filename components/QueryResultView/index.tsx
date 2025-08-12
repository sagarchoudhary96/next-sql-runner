import { TableData } from "@/types";
import {
  BarChart3Icon,
  FileJson,
  Sheet,
  Table as TableIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ResultChartViewProps from "./ResultChartView";
import ResultTableView from "./ResultTableView";

interface QueryResultViewProps {
  tableData: TableData;
}

type ViewMode = "table" | "chart";

/**
 * QueryResultView component that displays the results of a query in a paginated table format.
 * It includes pagination controls and options to export data in different formats.
 */
const QueryResultView = ({ tableData }: QueryResultViewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  return (
    <Card className="flex flex-1 overflow-hidden gap-2 py-2">
      <CardHeader className="px-2 sm:px-4">
        <div className="flex gap-2 justify-between items-center">
          <CardTitle>Results</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "chart" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setViewMode(viewMode === "table" ? "chart" : "table")
              }
            >
              {viewMode === "table" ? (
                <>
                  <BarChart3Icon className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Charts</span>
                </>
              ) : (
                <>
                  <TableIcon className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Table</span>
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Sheet className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">CSV</span>
            </Button>
            <Button variant="outline" size="sm">
              <FileJson className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">JSON</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col px-2 sm:px-4">
        {viewMode === "table" ? (
          <ResultTableView tableData={tableData} />
        ) : (
          <ResultChartViewProps tableData={tableData} />
        )}
      </CardContent>
    </Card>
  );
};

export default QueryResultView;
