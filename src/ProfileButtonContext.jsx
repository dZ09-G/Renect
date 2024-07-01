import React, { createContext, useState } from 'react';

export const ProfileButtonContext = createContext();

export const ProfileButtonProvider = ({ children }) => {
  const [profileButtonState, setProfileButtonState] = useState(false);

  return (
    <ProfileButtonContext.Provider value={{ profileButtonState, setProfileButtonState }}>
      {children}
    </ProfileButtonContext.Provider>
  );
};
