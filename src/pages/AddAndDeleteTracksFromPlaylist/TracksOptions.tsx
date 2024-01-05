/** @format */

import { useContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.scss";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";

type Props = {
  track: TrackData;
};

const TracksOptions = ({ track }: Props) => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
const [trackId, setTrackId] = useState<number>(0)
  const [message, setMessage] = useState<string>("");
  const [showMessage, setshowMessage] = useState(true);
  const [deleteTrack, setDeleteTrack] = useState<boolean>(false);
  const [show, setShow] = useState(true);
  const [addToPlaylistId, setAddToPlaylistId] = useState<number>(0);
  const [parsedPlaylists, setParsedPlaylists] = useState<Playlist[]>([]);
  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedAddButton, setclickedAddButton] = useState<boolean>(false);
  const [searchParams] = useSearchParams({});

  const {
    playlists,
    addToPlaylist,
    deleteFromPlaylist,
    isLoadingResponse
      } = useContext(PlaylistsContext);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;

      setSelectedTrack(+target.id);

      selectedTrack === track.id && target.className === "options"
        ? setclickedOption(!clickedOption)
        : setclickedOption(true);
      if (target.className.includes("addToPlaylist")) {
        setclickedAddButton(!clickedAddButton);
        const parsed = playlists.filter(
          (item) => item.id !== Number(searchParams.get("playlist"))
        );
        setParsedPlaylists(parsed);

        setclickedOption(false);
      } else {
        setclickedAddButton(false);
      }
      if (target.className.includes("deleteFromPlaylist")) {
        setDeleteTrack(!clickedAddButton);
        setclickedOption(false);
      } else {
        setDeleteTrack(false);
      }
      if (target.className.includes("backArrow")) setclickedOption(true);
      setTimeout(() => {
        setshowMessage(false);
      }, 4000);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [selectedTrack, clickedOption, clickedAddButton, deleteTrack, track.id]);

  const addSongToPlaylist = async (e: any) => {
    setShow(true);
    setTrackId(track.id);
    const target = e.target;
    setAddToPlaylistId(target.id)

const response = async () => {
  const code = await addToPlaylist(track.id, target.id);
  console.log(code);
  typeof code == "boolean" ? setMessage ("Трек додано"):  setMessage('Вже є у плейлисті')
}
response()
};
 
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [message, trackId, addToPlaylistId]);

  const deleteSongFromPlaylist = (e: any) => {
    const target = e.target;
    deleteFromPlaylist(track, Number(searchParams.get("playlist")));
  };

  return (
    <div>
      {show && !isLoadingResponse ? <div>{message} </div> : null}
      <button className="options" id={track.id.toString()}>
        ...
      </button>
      <div>
        {selectedTrack === track.id && clickedOption ? (
          <div>
            <div className={classes.addToPlaylist} id={track.id.toString()}>
              Додати в плейлист
            </div>
          </div>
        ) : null}
        {searchParams.get("playlist") &&
        selectedTrack === track.id &&
        clickedOption ? (
          <div id={track.id.toString()} className={classes.deleteFromPlaylist}>
            Видалити з плейлиста
          </div>
        ) : null}
      </div>
      {selectedTrack === track.id && (clickedAddButton || deleteTrack) ? (
        <div>
          <div id={track.id.toString()} className={classes.backArrow}>
            &#x21E6;
          </div>
          <div></div>
        </div>
      ) : (
        false
      )}
      {selectedTrack === track.id && clickedAddButton
        ? parsedPlaylists.map((item) => (
            <div
              onClick={addSongToPlaylist}
              id={item.id.toString()}
              key={item.id}
            >
              {item.title}
            </div>
          ))
        : null}
      {deleteTrack && selectedTrack === track.id ? (
        <div id={track.id.toString()} onClick={deleteSongFromPlaylist}>
          Видалити трек?
        </div>
      ) : null}
    </div>
  );
};
export default TracksOptions;
