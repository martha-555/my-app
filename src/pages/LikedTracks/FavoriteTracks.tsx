/** @format */

import Menu from "../../layout/Menu";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { useCallback, useContext, useEffect, useState } from "react";
import { authContext } from "../../feautures/auth/authProvider";
import { TrackData } from "../../types/deezer";
import { parseDeezerTrack } from "../../utils/deezer";
import useFetchFavoriteTracks from "../../feautures/api/hooks/deezer/useFetchFavoriteTracks";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import Track from "../../components/Track";
import Tracklist from "../../components/Tracklist/Tracklist";
import AddTrackToFavorite from "../AddTrackToFavorite/AddTrackToFavorite";
import { updateLikedTracks } from "../../utils/updateLikedTracks";

const FavoriteTracks = () => {

const [list,setList] = useState<TrackData[]>([]);

const tracks =  useFetchFavoriteTracks();
// const [idLikedList, setidLikedList] = useState<number[]>([])
// const request = useDeezerRequest();

   
    // useEffect(() => {
    //   updateLikedTracks({updateState:setidLikedList,likedList:setList, request})
    // },[request])

  return (
    <div  >

    <PageWrapper >
      {/* <Tracklist tracks={tracks} /> */}
      <AddTrackToFavorite tracks={tracks} error='' />
    </PageWrapper>
    </div>
  );
};

export default FavoriteTracks;
