/** @format */

"use client";
import { useCallback, useState } from "react";
import { BackendRequestBody } from "../types";
import { useErrorBoundary } from "react-error-boundary";

const BACKEND_URL = "https://music-backend-roan.vercel.app";

export type BackendResponseParser<Data> = (response: Response) => Promise<Data>;
export type BackendRequestState<Data> =
  | { data: null; isLoading: true }
  | { data: Data; isLoading: false };

type RequestMaker<Data> = (
  body: BackendRequestBody,
  parser: BackendResponseParser<Data>
) => Promise<Data | null>;

export type UseBackendRequestReturn<Data> = [
  RequestMaker<Data>,
  BackendRequestState<Data>
];

const useBackendRequest = <Data>(): UseBackendRequestReturn<Data> => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  //catch(e) { setIsLoading(true)
  // return Promise.resolve(null)
  // }

  const makeRequest: RequestMaker<Data> = useCallback(
    async (
      body: BackendRequestBody,
      parser: BackendResponseParser<Data | null>
    ) => {
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
    },
    [setIsLoading]
  );

  if (isLoading) {
    return [makeRequest, { isLoading: true, data: null }];
  }

  return [makeRequest, { isLoading: false, data: data as Data }];
};

export default useBackendRequest;
