import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{ isChatOpen, setIsChatOpen, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};
