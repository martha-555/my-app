/** @format */
import useBackendRequest from "../useBackendRequest";

const useGetMp3 = () => {
  const makeRequest = useBackendRequest();

  return async (query: string) => {
    const response = await makeRequest({
      type: "Mp3",
      payload: {
        query,
      },
    });
    console.log(await response.json());
  };
};

export default useGetMp3;
