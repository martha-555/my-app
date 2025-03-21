/** @format */
import favoriteIcon from "../icons/Star@3x.png";
import playlistsIcon from "../icons/Subtract.png";
import recomendationsIcon from "../icons/Headphones_fill@3x.png";
import { Routes } from "../apiHooks/types";

const routes: Routes[] = [
  {
    name: "Favorite",
    path: "/favorite",
    icon: favoriteIcon,
  },
  {
    name: "Playlists",
    path: "/playlists",
    icon: playlistsIcon,
  },
  {
    name: "Recommendations",
    path: "/recommendations",
    icon: recomendationsIcon,
  },
];
export { routes };
