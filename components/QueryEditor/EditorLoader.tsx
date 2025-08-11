import { LoaderCircleIcon } from "lucide-react";

const EditorLoader = () => {
  return (
    <div className="flex h-[140px] flex-col gap-2 items-center justify-center">
      <span className="text-sm text-muted-foreground">
        Setting up Editor, Please Wait ...
      </span>
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );
};

export default EditorLoader;
