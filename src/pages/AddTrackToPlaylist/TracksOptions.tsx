/** @format */

import { useCallback, useEffect, useState } from "react";
import fetchUsersPlaylists from "../../feautures/api/hooks/deezer/fetchUsersPlaylists";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";
import { parseDeezerTrack } from "../../utils/deezer";
import classes from "./styles.module.scss";
import classNames from "classnames";

type Props = {
  trackId: number;
};

const TracksOptions = ({ trackId }: Props) => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  // const playlists: Playlist[] = useFetchUsersPlaylists();
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
      selectedTrack === trackId && target.className === "options"
        ? setclickedOption(!clickedOption)
        : setclickedOption(true);
      selectedTrack === trackId &&
      target.className === "addToPlaylist"
        ? setclickedPlaylists(!clickedPlaylists)
        : setclickedPlaylists(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ selectedTrack, clickedOption, clickedPlaylists, trackId]);

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

  useEffect(() => {
    fetchUsersPlaylists({request,setState:setPlaylists});
    
},[])

  return (
    <div>
      {show ? <div>{message} </div> : null}
      <button className='options' id={trackId.toString()}>
        ...
      </button>
      {selectedTrack === trackId && clickedOption ? (
        <div className='addToPlaylist' id={trackId.toString()}>
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
