import ImportFormDialog from "../ImportTableDialog";
import { SidebarTrigger } from "../ui/sidebar";

const AppHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <div className="ml-auto flex items-center gap-2">
        <ImportFormDialog />
      </div>
    </header>
  );
};

export default AppHeader;
