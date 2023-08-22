/** @format */

import React, { useEffect } from "react";
import "./App.css";
import useBackendRequest from "./feautures/api/hooks/useBackendRequest";
import useDeezerRequest from "./feautures/api/hooks/deezer/useDeezerRequest";
import useGetMp3 from "./feautures/api/hooks/youtube/useGetMp3";
import { HttpMethod } from "./feautures/api/types";
import PageWrapper from "./layout/PageWrapper/PageWrapper";
import { Navigate, Route, Router, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Albums from "./pages/Albums/Albums";
import SearchTracks from "./pages/Search/SearchTracks";
import Auth from "./pages/Auth/Auth";
import useIsAuthorize from "./feautures/auth/hooks/useIsAuthorize";
import AuthProvider from "./feautures/auth/authProvider";
import FavoriteTracks from "./pages/LikedTracks/FavoriteTracks";
import PlayerProvider from "./feautures/player/playerProvider";
import CreatePlaylists from "./pages/Playlists/CreatePlaylists";
import LikedTracksProvider from "./feautures/likedTracks/likedTracksProvider";
import Playlists from "./pages/Playlists/Playlists";
import PlaylistsProvider from "./feautures/playlists/playlistsProvider";

const authRouters = createBrowserRouter([
  {
    path: "/favorite",
    element: <FavoriteTracks />,
  },
  {
    path: "/albums",
    element: <Albums />,
  },
  // {
  //   path: "/search",
  //   element: <SearchTracks />,
  // },
  {
    path: "/playlists",
    element: <Playlists />,
  },
  {
    path: "*",
    element: <Navigate to="/favorite" />,
  },
]);

const guestRouters = createBrowserRouter([
  {
    path: "*",
    element: <Auth />,
  },
]);

const AppRoutes = () => {
  const isAuth = useIsAuthorize();
  return (
    <RouterProvider
      router={isAuth ? authRouters : guestRouters}
    ></RouterProvider>
  );
};

function App() {
  const makeRequest = useGetMp3();

  return (
    <div>
      <AuthProvider>
        <PlaylistsProvider>
        <LikedTracksProvider>
          <PlayerProvider>
            <AppRoutes />
          </PlayerProvider>
        </LikedTracksProvider>
        </PlaylistsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
