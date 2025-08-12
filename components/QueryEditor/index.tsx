"use client";
import useActiveQueryEditor from "@/hooks/useActiveQueryEditor";
import { DEFAULT_STRINGS } from "@/lib/constants";
import { Play } from "lucide-react";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import EditorLoader from "./EditorLoader";
import EditorTabs from "./EditorTabs";
import LazyEditor from "./LazyEditor";
import { toast } from "sonner";

interface QueryEditorProps {
  onRunQuery: () => void;
}
const QueryEditor = ({ onRunQuery }: QueryEditorProps) => {
  const {
    currentQuery,
    handleQueryChange,
    activeEditorTab,
    editorTabs,
    updateEditorTabs,
  } = useActiveQueryEditor();

  const handleRunQuery = () => {
    if (!currentQuery) {
      toast.error(DEFAULT_STRINGS.TOAST_QUERY_EMPTY_MESSAGE);
      return;
    }
    onRunQuery();
    toast.success(DEFAULT_STRINGS.TOAST_QUERY_RUN_SUCCESS_MESSAGE);
  };

  return (
    <Card className="py-2 sm:py-4 gap-0">
      <CardHeader className="px-2 sm:px-6">
        <div className="flex items-center gap-2 justify-between w-full overflow-hidden">
          <EditorTabs
            tabs={editorTabs}
            activeTab={activeEditorTab?.id}
            onUpdateTabs={updateEditorTabs}
          />
          <Button onClick={handleRunQuery}>
            <Play />
            <span className="hidden sm:inline">{DEFAULT_STRINGS.RUN_QUERY}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[130px] px-2 sm:px-4">
        {/* Suspense is used to show a loader while the editor is being set up */}
        {/* Lazy loading the editor to improve performance */}
        <Suspense fallback={<EditorLoader />}>
          <LazyEditor
            aria-label="query editor input"
            mode="mysql"
            theme="tomorrow"
            name={"query-editor"}
            fontSize={16}
            maxLines={6}
            minLines={6}
            width="100%"
            showPrintMargin={false}
            showGutter
            highlightActiveLine={false}
            placeholder={DEFAULT_STRINGS.QUERY_EDITOR_PLACEHOLDER}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            value={currentQuery}
            onChange={handleQueryChange}
            className="border rounded-md"
          />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default QueryEditor;
