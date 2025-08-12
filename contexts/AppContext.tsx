"use client";
import React, { createContext } from "react";
import { getTablesMockData } from "@/lib/mockData";
import { TablesDataMap } from "@/types";

interface AppContextType {
  allTables: TablesDataMap | null;
}
/**
 * Context to manage app state
 * Can be replaced with Redux Store
 */
export const AppContext = createContext<AppContextType>({
  allTables: null,
});

/**
 * Context Provider to wrap component with AppContext
 * giving access to context Data
 */
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext
      value={{
        allTables: getTablesMockData(),
      }}
    >
      {children}
    </AppContext>
  );
};

export default AppContextProvider;
