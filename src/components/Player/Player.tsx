/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../feautures/player/playerProvider";
import classes from "./styles.module.scss";
import { formatSeconds } from "../../utils/time";
import classNames from "classnames";
import { ReactDOM } from "react";

const Player = () => {
  const {
    togglePlay,
    paused,
    next,
    back,
    currentTrack,
    rewind,
    currentTime,
    subtractTime,
    currentInputValue,
  } = useContext(PlayerContext);

  const [inputValue, setInputValue] = useState<number>(0);

  const handleMove = (event: React.MouseEvent) => {
    let target = (event.target as HTMLInputElement).value;
    // setInputValue(Math.round(+target));
    // console.log(Math.round(+target));
    rewind(+target);
  };

  useEffect(() => {
    setInputValue(currentInputValue);
    console.log("useeffect val", inputValue);
  }, [currentTime]);

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

      <div
        onClick={() => {
          back();
        }}
      >
        back
      </div>
      <div onClick={() => togglePlay()}>{paused ? "play" : "||"}</div>
      <div onClick={() => next()}>next</div>
      <div>{currentTime()} </div>
      {currentTrack ? (
        <input
          onMouseUp={handleMove}
          onChange={(e) => {
            setInputValue(+e.target.value);
            console.log("onchange val", e.target.value);
          }}
          className={classes.range}
          type="range"
          name="inp"
          value={inputValue}
        />
      ) : null}
      <div> {subtractTime} </div>
    </div>
  );
};
export default Player;
