/** @format */

import { HttpMethod } from "../../types";
import useBackendRequest from "../useBackendRequest";

const DEEZER_API_URL = "https://api.deezer.com";

const useDeezerRequest = () => {
  const makeRequest = useBackendRequest();

  return async (path: string, method: HttpMethod = HttpMethod.GET) => {
    const response = makeRequest({
      payload: {
        method: method,
        url: ` ${DEEZER_API_URL}${path}?access_code=frJQYCcZk1e7ScxjNrIfm7HbJnz38Q4Qcquv3wPVfpCl8fsrYA `,
      },
    });
    return response;
  };
};

export default useDeezerRequest;
