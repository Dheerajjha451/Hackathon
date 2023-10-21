import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}
// used to store all the arrays that may need to be passed with information changing after each reload in different components
export function DataProvider({ children }) {
  const [result, setResult] = useState([]);
  const [res1,set1]=useState([])
  const [res2,set2]=useState([])
  const [res3,set3]=useState([])
  const [res4,set4]=useState([])

  const values = {
    result,
    setResult,
    res1,
    set1,
    res2,
    set2,
    res3,
    set3,
    res4,
    set4,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}
