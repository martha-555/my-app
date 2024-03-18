/** @format */
import { Routes } from "../feautures/api/types";
import favoriteIcon from '../icons/Star@3x.png';
import playlistsIcon from '../icons/Subtract.png';
import recomendationsIcon from '../icons/Headphones_fill@3x.png'

const routes: Routes[] = [
  {
    name: "favorite",
    path: "/favorite",
    icon: favoriteIcon
  },
  {
    name: "playlists",
    path: "/playlists",
    icon: playlistsIcon
  },
  {
    name: "recommendations",
    path: "/recommendations",
    icon: recomendationsIcon
  },
];
export { routes };
