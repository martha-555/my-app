/** @format */

import useGetMp3 from "../../feautures/api/hooks/youtube/useGetMp3";
import React, { ContextType, useContext, useEffect, useState } from "react";
import { authContext } from "../../feautures/auth/authProvider";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props = {
  atr: string;
};
const PlayButton = ({ atr }: Props): JSX.Element => {
  const response = useGetMp3();
  const player = useContext(PlayerContext);

  const [song, setSong] = useState("");
  // useEffect(() => {
  const handleClick = async () => {
    const result = await response(atr);
    const mp3 = await result.json();

    const audio = new Audio(mp3.data.mp3);
    // setSong(await mp3.data.mp3);

    audio.play();
  };
  // handleClick();
  // }, []);

  // console.log({ song });
  return <div></div>;
};
export default PlayButton;
