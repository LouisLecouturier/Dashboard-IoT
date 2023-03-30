import { createContext, FC, ReactNode, useState } from "react";

export const refreshContext = createContext({
  refresh: false,
  setRefresh: (value : boolean) => {},
});

export default refreshContext;


export const RefreshProvider:FC<{children : ReactNode}> = ({ children }) => {
    const [refresh, setRefresh] = useState(false);

    return (
        <refreshContext.Provider value={{ refresh, setRefresh }}>
        {children}
        </refreshContext.Provider>
    );
}