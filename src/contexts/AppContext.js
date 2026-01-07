import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userName: '',
    selectedLanguage: null,
    selectedGoals: [],
    selectedLevel: '',
    tookPlacementTest: false,
  });

  const updateUserData = (updates) => {
    setUserData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetUserData = () => {
    setUserData({
      userName: '',
      selectedLanguage: null,
      selectedGoals: [],
      selectedLevel: '',
      tookPlacementTest: false,
    });
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        updateUserData,
        resetUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

