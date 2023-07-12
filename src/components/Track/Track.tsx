/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import { formatSeconds } from "../../utils/time";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import LikeButton from "../../pages/AddTrackToFavorite/LikeButton";
import { useSearchParams } from "react-router-dom";
import AddTrackToPlaylist from "../../pages/AddTrackToPlaylist/AddTrackToPlaylist";

type Props = {
  track: TrackData;
  children?: any;
};

const Track = ({ track, children }: Props) => {
  const { play, currentTrack, togglePlay } = useContext(PlayerContext);
  let [searchParams] = useSearchParams();


  return (
    <div>

    <div
      className={classes.container}
      onClick={(e) =>{ currentTrack?.id === track.id  ? togglePlay() : play(track.id)}
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
    </div>
      {searchParams.get("q")?<AddTrackToPlaylist trackId={track.id} />:'' }
    </div>
  );
};

export default Track;
