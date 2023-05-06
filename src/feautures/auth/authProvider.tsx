/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_AUTH_KEY } from "./constants";

type ContextType = {
  updateAuthKey: (authKey: string | null) => void;
  authKey: string | null;
};

export const authContext = createContext<ContextType>({
  updateAuthKey: () => {},
  authKey: null,
});

const AuthProvider = (props: { children: ReactElement }) => {
  const [authKey, setAuthKey] = useState(
    localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
  );

  const updateAuthKey = (authKey: string | null) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, authKey || "");
    setAuthKey(authKey || "");
  };
  return (
    <authContext.Provider value={{ updateAuthKey, authKey }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
