/** @format */

import { useContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { useSearchParams } from "react-router-dom";
import AddSongToPlaylist from "./AddSongToPlaylist";
import DeleteSongFromPlaylist from "./DeleteSongFromPlaylist";
import classes from "./styles.module.scss";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";

type Props = {
  track: TrackData

};

const TracksOptions = ({ track }: Props) => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);

  const [message, setMessage] = useState<string>("");
  const [showMessage, setshowMessage] = useState(true);
  const [show, setShow] = useState(true);

  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedPlaylists, setclickedPlaylists] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const request = useDeezerRequest();
  const {playlists,getTracks, trackList, addToPlaylist} = useContext(PlaylistsContext);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;
      setSelectedTrack(+target.id);
      selectedTrack === track.id && target.className === "options"
        ? setclickedOption(!clickedOption)
        : setclickedOption(true);

      if (selectedTrack === track.id && target.className === "addToPlaylist") {
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
 
  
  const addSongToPlaylist = async   (e:any) => {

    const target = e.target
  const tracks:TrackData[] = await  getTracks(target.id);
// const isInPlaylist = tracks.find((item) => item.id === track.id)
// console.log(tracks.find((item) => item.id === track.id ))
// console.log(tracks)
//  if (isInPlaylist) {
//   setMessage('Вже є у плейлисті') ; 
//  } else {
//   addToPlaylist(track, target.id); setMessage('Трек додано');
// }  
  }
  
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [message]);



  return (
    <div>
      {show? <div>{message} </div>: null }
      <button className="options" id={track.id.toString()} >
        ...
      </button>
      <div>
        {selectedTrack === track.id && clickedOption ? (
          <div className="addToPlaylist" id={track.id.toString()}>
            Додати в плейлист
          </div>
        ) : null}
        {searchParams.get("playlist") &&
        selectedTrack === track.id &&
        clickedOption ? (
          <DeleteSongFromPlaylist
            trackId={track.id}
            playlistId={searchParams.get("playlist")}
          />
        ) : null}
      </div>
  
      { selectedTrack === track.id && clickedPlaylists ? (
        <div>
          <div id={track.id.toString()} className={classes.backArrow}>
            &#x21E6;
          </div> 
          <div>{playlists.map(item => (
            <div onClick={addSongToPlaylist} id={item.id.toString()} key={item.id}  >{item.title} </div>
          ))} </div>
        </div>
      ) : (
        false
      )}
       
    </div>
  );
};
export default TracksOptions;
