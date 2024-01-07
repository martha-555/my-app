/** @format */

import { useCallback, useContext, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { LikedTracksContext } from "../../feautures/likedTracks/likedTracksProvider";
import { TrackData } from "../../types/deezer";

// `/playlist/${lovedTracks}/tracks&songs=${selectedTrack}`
type Props = {
  selectedTrack: number;
  track: TrackData;
};

const LikeButton = ({ selectedTrack, track }: Props) => {
  const [idLikedList, setidLikedList] = useState<number[]>([]);
  const [idLiked, setIdLiked] = useState<number>(0);
  const { favoriteTracks, addTrack, removeTrack } =
    useContext(LikedTracksContext);

  useEffect(() => {
    for (let i = 0; i < favoriteTracks?.length; i++) {}
    // console.log(favoriteTracks[i])
    setidLikedList(favoriteTracks?.map((item) => item.id));
  }, [favoriteTracks]);

  const handleClick = useCallback(() => {
    setIdLiked(selectedTrack);
    idLikedList.includes(selectedTrack) && idLikedList
      ? removeTrack(selectedTrack, track)
      : addTrack(selectedTrack, track);
  }, [idLiked, selectedTrack, idLikedList, track]);
  return (
    <>
      <div
        onClick={handleClick}
        className={
          idLikedList?.includes(+selectedTrack)
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
