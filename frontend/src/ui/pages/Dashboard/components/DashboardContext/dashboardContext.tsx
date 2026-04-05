import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  arevaluesVisible: boolean;
  toggleValueVIsiblility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue)


export function DashboardProvider({children}: {children: React.ReactNode}){
  const [arevaluesVisible,setArevaluesVisible] = useState(true)

  const toggleValueVIsiblility = useCallback(() => {
    setArevaluesVisible(prevState => !prevState)
  })

  return (
    <DashboardContext.Provider value={{arevaluesVisible, toggleValueVIsiblility}}>
      {children}
    </DashboardContext.Provider>
  )
}