import QueryEditor from "../QueryEditor";
import { Card, CardContent } from "../ui/card";

const QueryPlayground = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden w-full gap-2">
      <Card className="flex items-center justify-center flex-1">
        <CardContent>This is to show data</CardContent>
      </Card>

      <div className="w-full">
        <QueryEditor />
      </div>
    </div>
  );
};

export default QueryPlayground;
