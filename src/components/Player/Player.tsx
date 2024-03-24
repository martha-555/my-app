/** @format */

import React, { useCallback, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../feautures/player/playerProvider";
import classes from "./styles.module.scss";
import playButton from "../../icons/Player Buttons/Play Button.png";
import pauseButton from "../../icons/Player Buttons/pause.png";
import nextButton from "../../icons/Player Buttons/Next.png";
import previousButton from "../../icons/Player Buttons/Polygon 2 (1).png";

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

  const handleMove = (event: React.ChangeEvent) => {
    let target = (event.target as HTMLInputElement).value;
    setInputValue(+target);
    rewind(+target);
  };

  useEffect(() => {
    setInputValue(currentInputValue);
  }, [currentTime]);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") back();
    },
    [currentTrack]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {currentTrack ? (
          <div className={classes.song}>
            <img src={currentTrack.album.cover} alt="" />
            <span>{`${currentTrack?.artist.name}`}</span>
            <span>{currentTrack?.title}</span>
          </div>
        ) : null}

        <div
          onClick={() => {
            back();
          }}
        >
          <img className={classes.arrows} src={previousButton} alt="" />
        </div>
        <div onClick={() => togglePlay()}>
          {paused ? (
            <img className={classes.playButton} src={playButton} alt="" />
          ) : (
            <img className={classes.playButton} src={pauseButton} alt="" />
          )}
        </div>
        <div onClick={() => next()}>
          {" "}
          <img className={classes.arrows} src={nextButton} alt="" />{" "}
        </div>
      </div>

      <div className={classes.rangeWrapper}>
        <div>{currentTime()} </div>
        {currentTrack ? (
          <input
            onChange={handleMove}
            className={classes.range}
            type="range"
            name="inp"
            value={inputValue}
          />
        ) : null}
        <div> {subtractTime} </div>
      </div>
    </div>
  );
};
export default Player;
