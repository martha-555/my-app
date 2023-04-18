/** @format */

import React, { useEffect } from "react";
import "./App.css";
import useBackendRequest from "./feautures/api/hooks/useBackendRequest";
import useDeezerRequest from "./feautures/api/hooks/deezer/useDeezerRequest";
import useGetMp3 from "./feautures/api/hooks/youtube/useGetMp3";
import { HttpMethod } from "./feautures/api/types";
import PageWrapper from "./layout/PageWrapper/PageWrapper";
import { Route, Router, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FavoriteTracks from "./pages/LikedTracks/FavoriteTracks";
import Albums from "./pages/Albums/Albums";
import SearchTracks from "./pages/Search/SearchTracks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper />,
  },
  {
    path: "/favorite",
    element: <FavoriteTracks />,
  },
  {
    path: "/albums",
    element: <Albums />,
  },
  {
    path: "/search",
    element: <SearchTracks />,
  },
]);

function App() {
  const makeRequest = useGetMp3();

  return (
    <RouterProvider router={router}></RouterProvider>

    // <div className="App">

    // </div>
  );
}

export default App;
