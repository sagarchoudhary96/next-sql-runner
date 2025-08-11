"use client";
import { DEFAULT_STRINGS } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "../ui/card";
import EditorLoader from "./EditorLoader";
import { Suspense } from "react";
import LazyEditor from "./LazyEditor";
import useActiveQueryEditor from "@/hooks/useActiveQueryEditor";
import EditorControls from "./EditorControls";

const QueryEditor = () => {
  const { currentQuery, handleQueryChange } = useActiveQueryEditor();
  return (
    <Card>
      <CardHeader>
        <EditorControls />
      </CardHeader>
      <CardContent className="h-[140px]">
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
