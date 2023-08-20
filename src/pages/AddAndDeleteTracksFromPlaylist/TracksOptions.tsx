/** @format */

import { useEffect, useState } from "react";
import fetchUsersPlaylists from "../../feautures/api/hooks/deezer/fetchUsersPlaylists";
import { Playlist } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { useSearchParams } from "react-router-dom";
import AddSongToPlaylist from "./AddSongToPlaylist";
import DeleteSongFromPlaylist from "./DeleteSongFromPlaylist";
import classes from "./styles.module.scss";

type Props = {
  trackId: number;
};

const TracksOptions = ({ trackId }: Props) => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showMessage, setshowMessage] = useState(true);
  const [showOptions, setShowOptions] = useState(true);
  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedPlaylists, setclickedPlaylists] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const request = useDeezerRequest();

  const playlistsWithoutLiked = playlists?.filter(
    (item) => item.is_loved_track === false
  );

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;
      setSelectedTrack(+target.id);
      selectedTrack === trackId && target.className === "options"
        ? setclickedOption(!clickedOption)
        : setclickedOption(true);

      if (selectedTrack === trackId && target.className === "addToPlaylist") {
        setclickedPlaylists(!clickedPlaylists);
        setclickedOption(false);
      } else {
        setclickedPlaylists(false);
      }
      if (target.className.includes("backArrow")) setclickedOption(true);
      setTimeout(() => {
        setshowMessage(false);
      }, 4000);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [selectedTrack, clickedOption, clickedPlaylists, trackId]);

  useEffect(() => {
    // fetchUsersPlaylists({request,setState:setPlaylists});
  }, []);

  return (
    <div>
      {showMessage ? <div>{message} </div> : null}
      <button className="options" id={trackId.toString()}>
        ...
      </button>
      <div>
        {selectedTrack === trackId && clickedOption ? (
          <div className="addToPlaylist" id={trackId.toString()}>
            Додати в плейлист
          </div>
        ) : null}
        {searchParams.get("playlist") &&
        selectedTrack === trackId &&
        clickedOption ? (
          <DeleteSongFromPlaylist
            trackId={trackId}
            playlistId={searchParams.get("playlist")}
          />
        ) : null}
      </div>
      {clickedPlaylists && selectedTrack === trackId ? (
        <div>
          <div id={trackId.toString()} className={classes.backArrow}>
            &#x21E6;
          </div>
          {playlistsWithoutLiked.map((item) => (
            <AddSongToPlaylist
              key={item.id}
              id={item.id}
              title={item.title}
              setshowMessage={setshowMessage}
              trackId={trackId}
              setMessage={setMessage}
            />
          ))}
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export default TracksOptions;
