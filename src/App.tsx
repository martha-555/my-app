/** @format */

import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import useGetMp3 from "./feautures/api/hooks/youtube/useGetMp3";
import { Navigate, Outlet, Route, Router, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchTracks from "./pages/Search/SearchTracks";
import Auth from "./pages/Auth/Auth";
import useIsAuthorize from "./feautures/auth/hooks/useIsAuthorize";
import AuthProvider from "./feautures/auth/authProvider";
import FavoriteTracks from "./pages/LikedTracks/FavoriteTracks";
import PlayerProvider from "./feautures/player/playerProvider";
import LikedTracksProvider from "./feautures/likedTracks/likedTracksProvider";
import Playlists from "./pages/Playlists/Playlists";
import PlaylistsProvider from "./feautures/playlists/playlistsProvider";
import Recommendations from "./pages/Recommendations/Recommendations";
import React, { ComponentType, useEffect, useState } from "react";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={ErrorComponent}>
    <Outlet />
  </ErrorBoundary>
);

const authRouters = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/favorite",
        element: <FavoriteTracks />,
      },
      {
        path: "/recommendations",
        element: <Recommendations />,
      },
      {
        path: "/search",
        element: <SearchTracks />,
      },
      {
        path: "/playlists",
        element: <Playlists />,
      },
      {
        path: "*",
        element: <Navigate to="/favorite" />,
      },
    ],
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
  return (
    <div>
      <Toaster />
      <AuthProvider>
        <PlaylistsProvider>
          <LikedTracksProvider>
            <PlayerProvider>{<AppRoutes />}</PlayerProvider>
          </LikedTracksProvider>
        </PlaylistsProvider>
      </AuthProvider>
    </div>
  );
}

export default withErrorBoundary(App, {
  fallback: <div>Error</div>,
});
