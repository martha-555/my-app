/** @format */

import "./App.css";
import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import useIsAuthorize from "./feautures/auth/hooks/useIsAuthorize";
import AuthProvider from "./feautures/auth/authProvider";
import FavoriteTracks from "./pages/FavoriteTracks/FavoriteTracks";
import PlayerProvider from "./feautures/player/playerProvider";
import LikedTracksProvider from "./feautures/likedTracksContext/likedTracksProvider";
import Playlists from "./pages/Playlists/Playlists";
import PlaylistsProvider from "./feautures/playlists/playlistsProvider";
import Recommendations from "./pages/Recommendations/Recommendations";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./pages/ErrorPage/ErrorPage";
import SearchTracks from "./components/Search/SearchTracks";

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
