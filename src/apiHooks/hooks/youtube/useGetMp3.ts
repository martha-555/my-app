/** @format */
import useBackendRequest, { BackendRequestState } from "../useBackendRequest";

type ReturnType = [
  (query: string) => Promise<string | null>,
  BackendRequestState<string>
];

const useGetMp3 = (): ReturnType => {
  const [makeRequest, state] = useBackendRequest<string>();

  const getMp3 = async (query: string) => {
    return await makeRequest(
      {
        type: "Mp3",
        payload: {
          query,
        },
      },
      async (response) => {
        const json = await response.json();
        return await json.data.mp3;
      }
    );
  };

  return [getMp3, state];
};

export default useGetMp3;
