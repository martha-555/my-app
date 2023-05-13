/** @format */
import { HttpMethod } from "../../types";
import useBackendRequest from "../useBackendRequest";

const useGetMp3 = () => {
  const makeRequest = useBackendRequest();

  return async (query: string, method: HttpMethod = HttpMethod.GET) => {
    const response = await makeRequest({
      type: "Mp3",
      payload: {
        query,
      },
    });
    return response;
  };
};

export default useGetMp3;
