/** @format */

import { useContext } from "react";
import { LOCAL_STORAGE_AUTH_KEY } from "../constants";
import { authContext } from "../authProvider";

const useIsAuthorize = () => {
  const { authKey } = useContext(authContext);
  return !!authKey;
};
export default useIsAuthorize;
