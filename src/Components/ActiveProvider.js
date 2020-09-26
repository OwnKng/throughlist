import React, { createContext, useContext, useState } from "react";

const ActiveContext = createContext();
export const useActive = () => useContext(ActiveContext);

export default function ActiveProvider({ children }) {
  const [activeToDo, setActiveToDo] = useState({});

  return (
    <ActiveContext.Provider value={{ activeToDo, setActiveToDo }}>
      {children}
    </ActiveContext.Provider>
  );
}
