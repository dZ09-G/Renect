import React, { createContext, useState } from 'react';

export const LogedinContext = createContext();

export const LogedinContextProvider = ({ children }) => {
  const [logedinState, setlogedinState] = useState(false);

  return (
    <LogedinContext.Provider value={{ logedinState, setlogedinState }}>
      {children}
    </LogedinContext.Provider>
  );
};
