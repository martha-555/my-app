/** @format */

import { useContext } from "react";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { authContext } from "../../feautures/auth/authProvider";
import { JsxElement } from "typescript";

const FavoriteTracksRequest = () => {
  const { authKey } = useContext(authContext);
  const request = useDeezerRequest();

  const fetchRequest = async () => {
    const response = await request(`/user/me/tracks?access_token=${authKey}`);
    const trackList = await response.json();
    console.log(trackList);
    return <div>{trackList.data[0].title} </div>;
  };
  fetchRequest();
};

export default FavoriteTracksRequest;
