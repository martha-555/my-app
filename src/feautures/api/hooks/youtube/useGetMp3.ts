/** @format */
import { HttpMethod } from "../../types";
import useBackendRequest from "../useBackendRequest";

const useGetMp3 = () => {
  const [makeRequest] = useBackendRequest<string>();

  return async (query: string, method: HttpMethod = HttpMethod.GET) => {
    const response = await makeRequest(
      {
        type: "Mp3",
        payload: {
          query,
        },
      },
      async (response) => {
        const json = await response.json();
        console.log(json);
        return json;
      }
    );
  };
};

export default useGetMp3;
