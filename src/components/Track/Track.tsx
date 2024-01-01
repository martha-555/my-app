/** @format */

import { useContext, useEffect, useRef, useState } from "react";
import { TrackData } from "../../types/deezer";
import { formatSeconds } from "../../utils/time";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import LikeButton from "../../pages/AddTrackToFavorite/LikeButton";
import { useSearchParams } from "react-router-dom";
import TracksOptions from "../../pages/AddAndDeleteTracksFromPlaylist/TracksOptions";
import { forwardRef } from "react";
type Props = {
  track: TrackData;
};

const Track = forwardRef(
  ({ track }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { play, currentTrack, togglePlay } = useContext(PlayerContext);

    return (
      <div ref={ref}>
        <div
          className={classes.container}
          onClick={(e) => {
            currentTrack?.id === track.id ? togglePlay() : play(track.id);
          }}
        >
          <img className={classes.cover} src={track.album.cover} />
          <div className={classes.mainInfo}>
            <span>{track.title}</span>
            <span>{track.artist.name}</span>
          </div>
          <div className={classes.duration}>
            {formatSeconds(track.duration)}
          </div>
        </div>
        <LikeButton selectedTrack={+track.id} track={track} />
        <TracksOptions track={track} />
      </div>
    );
  }
);

export default Track;
