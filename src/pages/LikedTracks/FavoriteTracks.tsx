/** @format */

import Menu from "../../layout/Menu";
import classes from "./styles.module.scss";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../feautures/auth/authProvider";
import FavoriteTracksRequest from "./FavoriteTracksRequest";

const FavoriteTracks = () => {
  const { authKey } = useContext(authContext);
  const request = useDeezerRequest();
  const [track, setTrack] = useState([]);
  useEffect(() => {
    const fetchRequest = async () => {
      const response = await request(`/user/me/tracks?access_token=${authKey}`);
      const trackList = await response.json();
      setTrack(trackList.data);
    };

    fetchRequest();
  }, [authKey]);

  console.log(track);
  return (
    <div>
      <Menu />
    </div>
  );
};

export default FavoriteTracks;
