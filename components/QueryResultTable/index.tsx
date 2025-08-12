import {
  BarChart3Icon,
  ChevronLeft,
  ChevronRight,
  Download,
  FileJson,
  Sheet,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from "../ui/table";
import { TableData } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_TABLE_PAGE_SIZE,
  TABLE_PAGE_SIZE_OPTIONS,
} from "@/lib/constants";

interface QueryResultTableProps {
  tableData: TableData;
}

const QueryResultTable = ({ tableData }: QueryResultTableProps) => {
  const { rows, metadata } = tableData;

  const [pageSize, setPageSize] = useState<number>(DEFAULT_TABLE_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTableName, setCurrentTableName] = useState<string>(
    metadata.tableName
  );

  const totalRows = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  useEffect(() => {
    if (currentTableName === metadata.tableName) return;
    setCurrentPage(1);
    setCurrentTableName(metadata.tableName);
  }, [currentTableName, metadata.tableName]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return rows.slice(start, end + 1);
  }, [rows, currentPage, pageSize]);

  const fromRow = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const toRow = Math.min(currentPage * pageSize, totalRows);

  return (
    <Card className="flex flex-1 overflow-hidden gap-2 py-2">
      <CardHeader className="px-2 sm:px-6">
        <div className="flex gap-2 justify-between items-center">
          <CardTitle>Results</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BarChart3Icon className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Charts</span>
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
      <CardContent className="flex-1 overflow-hidden flex flex-col px-2">
        <div className="mb-3 flex gap-3 flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <label
              htmlFor="page-size"
              className="text-xs sm:text-sm text-muted-foreground"
            >
              Rows per page
            </label>
            <select
              id="page-size"
              className="h-9 rounded-md border px-3 text-sm bg-background"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {TABLE_PAGE_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {fromRow}-{toRow} of {totalRows}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-2 text-xs sm:text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="rounded-md border max-h-full w-full overflow-hidden flex">
            <ScrollArea className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {metadata.columns.map((column, index) => (
                      <TableHead key={index} className="font-semibold">
                        {column.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {metadata.columns.map((column, colIndex) => (
                        <TableCell key={colIndex}>
                          {column.name === "picture" ? (
                            <Image
                              src={row[column.name] as string}
                              alt={`${column.name}_${colIndex}`}
                              className="h-4 w-4"
                              width={32}
                              height={32}
                            />
                          ) : (
                            String(row[column.name] ?? "")
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QueryResultTable;
