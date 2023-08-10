/** @format */

import {useCallback, useState} from "react";
import { BackendRequestBody } from "../types";

const BACKEND_URL = "http://localhost:3001";

export type BackendResponseParser<Data> = (response: Response) => Promise<Data>;
export type BackendRequestState<Data> = { data: null; isLoading: true } | { data: Data, isLoading: false}

type RequestMaker<Data> = (body: BackendRequestBody, parser: BackendResponseParser<Data>) => Promise<Data>;
type UseBackendRequestReturn<Data> = [RequestMaker<Data>, BackendRequestState<Data>];

const useBackendRequest = <Data>(): UseBackendRequestReturn<Data> => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const makeRequest = useCallback( async (body: BackendRequestBody, parser: BackendResponseParser<Data>)=> {
    setData(null);
    setIsLoading(true);

    const data = await fetch(BACKEND_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parsedData = await parser(data);

    setData(parsedData);
    setIsLoading(false);

    return parsedData;
  }, [setIsLoading]);

  if (isLoading) {
    return [makeRequest, {isLoading: true, data: null}];
  }


  return [makeRequest, {isLoading: false, data: data as Data}];
};

export default useBackendRequest;
