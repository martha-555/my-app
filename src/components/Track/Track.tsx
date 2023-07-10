/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";

import { formatSeconds } from "../../utils/time";
import PlayButton from "../PlayButton/PlayButton";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import LikeButton from "../../pages/AddTrackToFavorite/LikeButton";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { updateLikedTracks } from "../../utils/updateLikedTracks";
import { useSearchParams } from "react-router-dom";
import AddTrackToPlaylist from "../../pages/AddTrackToPlaylist/AddTrackToPlaylist";

type Props = {
  track: TrackData;
  children?: any;
  
};

const Track = ({ track, children }: Props) => {
  const { play, currentTrack, pause, togglePlay } = useContext(PlayerContext);
  const [selectedTrack, setSelectedTrack] = useState(0);
  let [searchParams] = useSearchParams();


  return (
    <div
      className={classes.container}
      onClick={() =>
        currentTrack?.id === track.id ? togglePlay() : play(track.id)
      }
    >
      <img className={classes.cover} src={track.album.cover} />
      <div className={classes.mainInfo}>
        <span>{track.title}</span>
        <span>{track.artist.name}</span>
      </div>
      <div className={classes.duration}>{formatSeconds(track.duration)}</div>
      {children}

      <LikeButton selectedTrack={+track.id} />
      {searchParams.get("q")?<AddTrackToPlaylist />:'' }
    </div>
  );
};

export default Track;
