/** @format */

import { useCallback } from "react";
import { BackendRequestBody } from "../types";

const BACKEND_URL = "http://localhost:3001";

const useBackendRequest = () => {
  return useCallback(async (body: BackendRequestBody) => {
    const data = await fetch(BACKEND_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  }, []);
};

export default useBackendRequest;
