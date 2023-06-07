/** @format */

import React, { useContext, useRef } from "react";
import { PlayerContext } from "../../feautures/player/playerProvider";
import classes from "./styles.module.scss";
import { formatSeconds } from "../../utils/time";
import classNames from "classnames";
import { ReactDOM } from "react";
import moment from "moment";

const Player = () => {
  const myRef = useRef<HTMLInputElement>(null);
  const range = myRef;

  const { togglePlay, paused, next, back, currentTrack, rewind, currentTime,subtractTime } =
    useContext(PlayerContext);

  return (
    <div className={classes.container}>
      {currentTrack ? (
        <div className={classes.song}>
          <span>{`${currentTrack?.artist.name}`}</span>
          <span>{currentTrack?.title}</span>
        </div>
      ) : (
        <div></div>
      )}

      <div onClick={() => back()}>back</div>
      <div onClick={() => togglePlay()}>{paused ? "play" : "||"}</div>
      <div onClick={() => next()}>next</div>
      <div>{currentTime()} </div>
      {currentTrack ? (
        <input
          ref={myRef}
          className={classes.range}
          type="range"
          defaultValue="0"
          onChange={() => {
            rewind();
          }}
        />
      ) : null}
      <div> {subtractTime} </div>
    </div>
  );
};
export default Player;
