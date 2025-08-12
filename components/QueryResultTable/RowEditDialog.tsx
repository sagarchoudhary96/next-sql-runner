"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_STRINGS } from "@/lib/constants";
import { TableRowRecord } from "@/types";
import { useMemo } from "react";
import { toast } from "sonner";

interface RowEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableName: string;
  columns: Array<{ name: string; type: string }>;
  rowData?: TableRowRecord;
}

const RowEditDialog = ({
  open,
  onOpenChange,
  tableName,
  columns,
  rowData,
}: RowEditDialogProps) => {
  const fields = useMemo(
    () =>
      !rowData
        ? []
        : columns.map((col) => ({
            key: col.name,
            label: col.name,
            type: col.type,
            value: rowData[col.name],
          })),
    [columns, rowData]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {DEFAULT_STRINGS.TABLE_ROW_DIALOG}
            {tableName ? (
              <span className="text-muted-foreground text-sm ml-2">
                ({tableName})
              </span>
            ) : null}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fields.map(({ key, label, value, type }) => {
            const inputId = `row-field-${tableName}-${key}`;
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <Label htmlFor={inputId}>{label}</Label>
                <Input
                  id={inputId}
                  defaultValue={
                    value !== undefined && value !== null ? String(value) : ""
                  }
                  placeholder={type}
                />
              </div>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {DEFAULT_STRINGS.BUTTON_CANCEL_TEXT}
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              toast.success(DEFAULT_STRINGS.TOAST_ROW_EDIT_SUCCESS_MESSAGE);
            }}
          >
            {DEFAULT_STRINGS.BUTTON_SAVE_CHANGES_TEXT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RowEditDialog;
