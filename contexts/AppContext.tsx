"use client";
import React, { createContext } from "react";
import { getTablesMockData } from "@/lib/mockData";
import { TableData } from "@/types";

interface AppContextType {
  tables: TableData | null;
}
/**
 * Context to manage app state
 * Can be replaced with Redux Store
 */
export const AppContext = createContext<AppContextType>({
  tables: null,
});

/**
 * Context Provider to wrap component with AppContext
 * giving access to context Data
 */
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext
      value={{
        tables: getTablesMockData(),
      }}
    >
      {children}
    </AppContext>
  );
};

export default AppContextProvider;
