/** @format */

import { useCallback, useContext, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { LikedTracksContext } from "../../feautures/likedTracksContext/likedTracksProvider";
import { TrackData } from "../../types/deezer";

// `/playlist/${lovedTracks}/tracks&songs=${selectedTrack}`
type Props = {
  selectedTrack: number;
  track: TrackData;
};

const LikeButton = ({ selectedTrack, track }: Props) => {
  const [idLikedList, setidLikedList] = useState<number[]>([]);
  const [responseCode, setResponseCode] = useState<boolean>(false);
  const [idLiked, setIdLiked] = useState<number>(0);
  const { favoriteTracks, addTrack, removeTrack } =
    useContext(LikedTracksContext);

  useEffect(() => {
    if (favoriteTracks) {
      for (let i = 0; i < favoriteTracks?.length; i++) {}
      // console.log(favoriteTracks[i])
      setidLikedList(favoriteTracks?.map((item) => item.id));
    }
  }, [favoriteTracks]);

  const handleClick = async () => {
    setIdLiked(selectedTrack);
    idLikedList.includes(selectedTrack) && idLikedList
      ? removeTrack(selectedTrack, track)
      : addTrack(selectedTrack, track);
    //   const code = await addTrack(selectedTrack, track);
    //  if ( typeof code !== "boolean") removeTrack(selectedTrack, track);
    //  typeof code == "boolean" ? setResponseCode(true) : setResponseCode(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={
          idLikedList.includes(selectedTrack)
            ? classes.isLiked
            : classes.notClicked
        }
      >
        &#10084;
      </div>
    </>
  );
};
export default LikeButton;
