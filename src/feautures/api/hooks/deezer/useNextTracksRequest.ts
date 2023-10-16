import { useCallback } from "react";
import { HttpMethod } from "../../types";
import useBackendRequest, {
    BackendRequestState,
    BackendResponseParser,
  } from "../useBackendRequest";

type RequestMaker<Data> = (params: {
    path: string;
    method?: HttpMethod;
    parser: BackendResponseParser<Data>;
  }) => Promise<Data>;
  type UseDeezerRequestReturn<Data> = [
    RequestMaker<Data>,
    BackendRequestState<Data>
  ];
const useNextTracksRequest =  <Data>():UseDeezerRequestReturn<Data> => {
    const [makeRequest, state] = useBackendRequest<Data>()

    const makeNextRequest = useCallback<RequestMaker<Data>>(async ({ path, parser, method = HttpMethod.GET }) => {
        return makeRequest({
            payload: {
              method: method, 
              url: `${path}${
                path.includes("?") ? "&" : "?"
              }`,
            },
          },
          parser)
    },[])
    return [makeNextRequest, state];
}
export default useNextTracksRequest;