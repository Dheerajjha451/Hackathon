import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [result, setResult] = useState([]);

  const values = {
    result,
    setResult,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}
