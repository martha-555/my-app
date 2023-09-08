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

  const [message, setMessage] = useState<string>("");
  const [showMessage, setshowMessage] = useState(true);
  const [show, setShow] = useState(true);
  const [isInPlaylist, setIsInPlaylist] = useState<any>('')
  const [playlistId, setPlaylistsId] = useState<number>(0)
const [clickFunction, setClickFunction] = useState<any>(() =>{})
  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedPlaylists, setclickedPlaylists] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [request, state] = useDeezerRequest();
  const { playlists, getTracks, trackList, addToPlaylist,deleteFromPlaylist } =
    useContext(PlaylistsContext);
  

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;
      if( target.className.includes('addToPlaylist')) setClickFunction( () => () =>  addSongToPlaylist(e));
     if (target.className.includes('deleteFromPlaylist')) setClickFunction(() => deleteSongFromPlaylist);
      setSelectedTrack(+target.id);
      selectedTrack === track.id && target.className === "options"
        ? setclickedOption(!clickedOption)
        : setclickedOption(true);
      if (selectedTrack === track.id && (target.className.includes('addToPlaylist') || target.className.includes('deleteFromPlaylist')))  {
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
  }, [selectedTrack, clickedOption, clickedPlaylists, track.id]);

  const addSongToPlaylist = async (e: any) => {
    console.log(clickFunction)
    setShow(true);
    const target = e.target;
 const tracks = await getTracks(target.id);
      const isInPlaylist =  tracks?.find((item:any) => item.id === track.id);

      setPlaylistsId(target.id)
      if (isInPlaylist) {
        setMessage("Вже є у плейлисті");
      } else {
        addToPlaylist(track, target.id);
        setMessage("Трек додано");
      }
    }

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [getTracks]);

// useEffect(() => {
 
//      if( trackList[playlistId] ){
//        const inPlaylist =Object.values( trackList[playlistId])?.find((item:any) => item.id === track.id);
//      if (inPlaylist) setIsInPlaylist(true);
//     //  console.log(inPlaylist)
//     }
// },[playlistId])
console.log(clickFunction)
  const deleteSongFromPlaylist = (e:any) => {
    const target = e.target;
    deleteFromPlaylist(track, target.id)
  };
console.log({addSongToPlaylist})
  return (
    <div>
      {show ? <div>{message} </div> : null}
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
        <div id={track.id.toString()} className={classes.deleteFromPlaylist} >Видалити з плейлиста</div>
          
        ) : null}
      </div>

      {selectedTrack === track.id && clickedPlaylists ? (
        <div>
          <div id={track.id.toString()} className={classes.backArrow}>
            &#x21E6;
          </div>
          <div>
            {playlists.map((item) => (
              <div
                onClick={ clickFunction }
                id={item.id.toString()}
                key={item.id}
              >
                {item.title}{" "}
              </div>
            ))}{" "}
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export default TracksOptions;
