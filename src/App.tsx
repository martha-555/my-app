/** @format */

import React, { useEffect } from "react";
import "./App.css";
import useBackendRequest from "./feautures/api/hooks/useBackendRequest";
import useDeezerRequest from "./feautures/api/hooks/deezer/useDeezerRequest";
import useGetMp3 from "./feautures/api/hooks/youtube/useGetMp3";
import { HttpMethod } from "./feautures/api/types";

function App() {
  const makeRequest = useGetMp3();

  return (
    <div className="App">
      <button onClick={() => makeRequest("show mst")}>click</button>
    </div>
  );
}

export default App;
