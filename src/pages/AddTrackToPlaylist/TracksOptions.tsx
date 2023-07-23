/** @format */

import { useCallback, useEffect, useState } from "react";
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";
import { parseDeezerTrack } from "../../utils/deezer";
import classes from "./styles.module.scss";

type Props = {
  trackId: number;
};

const TracksOptions = ({ trackId }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const playlists: Playlist[] = useFetchUsersPlaylists();
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState(true);
  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedPlaylists, setclickedPlaylists] = useState<boolean>(false);

  const playlistsWithoutLiked = playlists?.filter(
    (item) => item.is_loved_track === false
  );
  const request = useDeezerRequest();

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;
      setSelectedTrack(+target.id);

      selectedTrack === trackId ? setIsClicked(!isClicked) : setIsClicked(true);
      selectedTrack === trackId && target.className === "styles_options__HV1mZ"
        ? setclickedOption(!clickedOption)
        : setIsClicked(true);
      selectedTrack === trackId &&
      target.className === "styles_addToPlaylist__pBZNo"
        ? setclickedPlaylists(!clickedPlaylists)
        : setclickedPlaylists(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isClicked, selectedTrack, clickedOption, clickedPlaylists, trackId]);

  const addSongToPlaylist = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      setShow(true);
      const target = e.target as HTMLElement;

      const response = await request(`/playlist/${target.id}/tracks`);
      const tracks = await response.json();
      const parsed: TrackData[] = tracks?.data?.map(parseDeezerTrack);
      const idInPlaylist = parsed.filter((item) => item.id === trackId);

      idInPlaylist?.length > 0
        ? setMessage("Вже є у плейлисті")
        : (await request(
            `/playlist/${target.id}/tracks&songs=${trackId}`,
            HttpMethod.POST
          )) && setMessage("Трек додано");
    },
    [trackId, message, show]
  );
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [addSongToPlaylist]);

  return (
    <div>
      {show ? <div>{message} </div> : null}
      <button className={classes.options} id={trackId.toString()}>
        ...
      </button>
      {selectedTrack === trackId && isClicked ? (
        <div className={classes.addToPlaylist} id={trackId.toString()}>
          Додати в плейлист
        </div>
      ) : null}

      {clickedPlaylists && selectedTrack === trackId ? (
        <div>
          {playlistsWithoutLiked.map((item) => (
            <div
              id={item.id.toString()}
              onClick={addSongToPlaylist}
              key={item.id}
            >
              {item.title}
            </div>
          ))}
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export default TracksOptions;
