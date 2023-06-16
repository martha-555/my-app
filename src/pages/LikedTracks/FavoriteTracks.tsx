/** @format */

import Menu from "../../layout/Menu";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../feautures/auth/authProvider";
import { TrackData } from "../../types/deezer";
import { parseDeezerTrack } from "../../utils/deezer";
import useFetchFavoriteTracks from "../../feautures/api/hooks/deezer/useFetchFavoriteTracks";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import Track from "../../components/Track";
import Tracklist from "../../components/Tracklist/Tracklist";

const FavoriteTracks = () => {
  const tracks = useFetchFavoriteTracks();

  return (
    <div  >

    <PageWrapper >
      <Tracklist tracks={tracks} />
    </PageWrapper>
    </div>
  );
};

export default FavoriteTracks;
