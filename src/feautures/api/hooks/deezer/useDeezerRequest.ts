/** @format */

import { useCallback, useContext } from "react";
import { HttpMethod } from "../../types";
import useBackendRequest from "../useBackendRequest";
import { authContext } from "../../../auth/authProvider";

const DEEZER_API_URL = "https://api.deezer.com";

const useDeezerRequest = () => {
  const makeRequest = useBackendRequest();
  const { authKey } = useContext(authContext);

  return useCallback(
    async (path: string, method: HttpMethod = HttpMethod.GET) => {
      const response = makeRequest({
        payload: {
          method: method, // /search?q=123  /tracks
          url: ` ${DEEZER_API_URL}${path}${
            path.includes("?") ? "&" : "?"
          }access_token=${authKey} `,
        },
      });
      return response;
    },
    [makeRequest,authKey]
  );
};

export default useDeezerRequest;
