/** @format */

import { useCallback, useContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { useSearchParams } from "react-router-dom";
import AddSongToPlaylist from "./AddSongToPlaylist";
import DeleteSongFromPlaylist from "./DeleteSongFromPlaylist";
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
  const [clickFunction, setClickFunction] = useState<any>(() => {});
  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedAddButton, setclickedAddButton] = useState<boolean>(false);

  const [clickedDeleteButton, setClickedDeleteButton] =
    useState<boolean>(false);
  const [searchParams] = useSearchParams({});
  const [request, state] = useDeezerRequest();
  const {
    playlists,
    getTracks,
    trackList,
    addToPlaylist,
    deleteFromPlaylist,
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
    const tracks = await getTracks(target.id);
    const isInPlaylist = tracks?.find((item) => item.id === track.id);
    // console.log(isInPlaylist);
    isInPlaylist ? setMessage("Вже є у плейлисті") : setMessage("Трек додано");
    // if (isInPlaylist === undefined) {
    //   setMessage(test)
    //   addToPlaylist(track, target.id);
    // }
  };
  

 
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
      if (message === 'Трек додано') {
        addToPlaylist(trackId, addToPlaylistId);
      }
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [trackId,show,addToPlaylistId]);




  useEffect(() => {
  
  }, [trackId,message]);

  // useEffect(() => {

  //      if( trackList[playlistId] ){
  //        const inPlaylist =Object.values( trackList[playlistId])?.find((item:any) => item.id === track.id);
  //      if (inPlaylist) setIsInPlaylist(true);
  //     //  console.log(inPlaylist)
  //     }
  // },[playlistId])

  const deleteSongFromPlaylist = (e: any) => {
    const target = e.target;
    deleteFromPlaylist(track, Number(searchParams.get("playlist")));
  };

  return (
    <div>
      {show  ? <div>{message} </div> : null}
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
