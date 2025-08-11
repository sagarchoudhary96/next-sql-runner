import { DEFAULT_STRINGS, SAVED_QUERIES } from "@/lib/constants";
import { User2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SavedQueriesItems = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-md font-semibold">
        {DEFAULT_STRINGS.HEADER_SAVED_QUERIES}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {SAVED_QUERIES.map(({ id, name, query }) => (
              <SidebarMenuButton
                size="sm"
                key={id}
                className="w-full h-auto items-start cursor-pointer"
              >
                <User2 />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{name}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-xs text-muted-foreground w-full text-ellipsis overflow-hidden line-clamp-1">
                        {query}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{query}</TooltipContent>
                  </Tooltip>
                </div>
              </SidebarMenuButton>
            ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SavedQueriesItems;
