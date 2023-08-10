/** @format */

import { useCallback, useContext } from "react";
import { HttpMethod} from "../../types";
import useBackendRequest, {BackendRequestState, BackendResponseParser} from "../useBackendRequest";
import { authContext } from "../../../auth/authProvider";

const DEEZER_API_URL = "https://api.deezer.com";

type RequestMaker<Data> = (params: {path: string,  method?: HttpMethod, parser: BackendResponseParser<Data>}) => Promise<Data>;
type UseDeezerRequestReturn<Data> = [RequestMaker<Data>, BackendRequestState<Data>];

const useDeezerRequest = <Data>(): UseDeezerRequestReturn<Data> => {
  const [makeRequest, state] = useBackendRequest<Data>();
  const { authKey } = useContext(authContext);

  const makeDeezerRequest = useCallback<RequestMaker<Data>>(
    async ({path, parser, method = HttpMethod.GET}) => {
      return makeRequest({
        payload: {
          method: method, // /search?q=123  /tracks
          url: ` ${DEEZER_API_URL}${path}${
            path.includes("?") ? "&" : "?"
          }access_token=${authKey} `,
        },
      }, parser);
    },
    [makeRequest]
  );

  return [makeDeezerRequest, state];
};

export default useDeezerRequest;
