import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
export default useAppContext;
