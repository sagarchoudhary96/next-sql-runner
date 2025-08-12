"use client";
import { FileUpIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DEFAULT_STRINGS } from "@/lib/constants";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { toast } from "sonner";

/**
 * ImportFormDialog component that handles file import functionality.
 * used for importing datasets into the application.
 */
const ImportFormDialog = () => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const onUpload = () => {
    // Handle file upload logic here
    setUploading(true);
    // Simulate a file upload with a timeout
    setTimeout(() => {
      setUploading(false);
      setOpen(false);
      toast.success(DEFAULT_STRINGS.TOAST_IMPORT_SUCCESS_MESSAGE);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <FileUpIcon />
          {DEFAULT_STRINGS.IMPORT_DATA}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{DEFAULT_STRINGS.IMPORT_DATA_DIALOG_TITLE}</DialogTitle>
          <DialogDescription>
            {DEFAULT_STRINGS.IMPORT_DATA_HELP_TEXT}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Label htmlFor="file-upload" className="flex-1 whitespace-nowrap">
            {DEFAULT_STRINGS.FILE}
          </Label>
          <Input
            className="w-auto cursor-pointer"
            accept=".csv, .sql, .json, .xml"
            id="file-upload"
            type="file"
          />
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button variant="outline">
              {DEFAULT_STRINGS.BUTTON_CANCEL_TEXT}
            </Button>
          </DialogClose>
          <Button onClick={onUpload}>
            {uploading && <Loader2 className="animate-spin" />}
            {DEFAULT_STRINGS.BUTTON_UPLOAD_TEXT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportFormDialog;
