import { DEFAULT_STRINGS, predefinedQueries } from "@/lib/constants";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Save } from "lucide-react";

const PredefinedQueriesItems = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-md font-semibold">
        {DEFAULT_STRINGS.HEADER_PREDEFINED_QUERIES}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {predefinedQueries.map((query) => (
              <SidebarMenuButton
                size="sm"
                key={query.name}
                className="w-full h-auto items-start cursor-pointer"
              >
                <Save />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{query.name}</p>
                  <p className="text-xs text-muted-foreground whitespace-normal w-full">
                    {query.description}
                  </p>
                </div>
              </SidebarMenuButton>
            ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default PredefinedQueriesItems;
