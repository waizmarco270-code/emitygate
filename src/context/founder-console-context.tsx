
'use client';

import React, { createContext, useState, useContext, useMemo } from 'react';

type FounderConsoleContextType = {
  isConsoleOpen: boolean;
  setIsConsoleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FounderConsoleContext = createContext<FounderConsoleContextType | undefined>(undefined);

export function FounderConsoleProvider({ children }: { children: React.ReactNode }) {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const value = useMemo(() => ({
    isConsoleOpen,
    setIsConsoleOpen,
  }), [isConsoleOpen]);

  return (
    <FounderConsoleContext.Provider value={value}>
      {children}
    </FounderConsoleContext.Provider>
  );
}

export function useFounderConsole() {
  const context = useContext(FounderConsoleContext);
  if (context === undefined) {
    throw new Error('useFounderConsole must be used within a FounderConsoleProvider');
  }
  return context;
}
