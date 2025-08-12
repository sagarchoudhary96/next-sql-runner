"use client";
import {
  DEFAULT_TABLE_PAGE_SIZE,
  TABLE_PAGE_SIZE_OPTIONS,
} from "@/lib/constants";
import { TableData, TableRowRecord } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import RowEditDialog from "./RowEditDialog";

interface ResultTableViewProps {
  tableData: TableData;
}

/**
 * ResultTableView component that displays the results of a query in a paginated table format.
 * It includes pagination controls and options to export data in different formats.
 */
const ResultTableView = ({ tableData }: ResultTableViewProps) => {
  const { rows, metadata } = tableData;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTableName, setCurrentTableName] = useState<string>(
    metadata.tableName
  );
  const [pageSize, setPageSize] = useState<number>(DEFAULT_TABLE_PAGE_SIZE);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TableRowRecord | undefined>(
    undefined
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

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedRow(undefined);
    }
  };
  return (
    <>
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
                  <TableRow
                    key={rowIndex}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedRow(row);
                      setDialogOpen(true);
                    }}
                  >
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
        <RowEditDialog
          open={dialogOpen}
          onOpenChange={handleDialogOpenChange}
          tableName={metadata.tableName}
          columns={metadata.columns}
          rowData={selectedRow}
        />
      </div>
    </>
  );
};

export default ResultTableView;
