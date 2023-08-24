/** @format */

import { useContext, useEffect, useState } from "react";
import { Playlist } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { useSearchParams } from "react-router-dom";
import AddSongToPlaylist from "./AddSongToPlaylist";
import DeleteSongFromPlaylist from "./DeleteSongFromPlaylist";
import classes from "./styles.module.scss";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";

type Props = {
  trackId: number;
  name: string
};

const TracksOptions = ({ trackId,name }: Props) => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);

  const [message, setMessage] = useState<string>("");
  const [showMessage, setshowMessage] = useState(true);
  const [showOptions, setShowOptions] = useState(true);
  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedPlaylists, setclickedPlaylists] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const request = useDeezerRequest();
  const {playlists,getTracklist} = useContext(PlaylistsContext);

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

const addToPlaylist = async (e:any) => {
  const target = e.target
  const track = await  getTracklist(+target.id)

  console.log({track})
}


  return (
    <div>
      { <div>{message} </div> }
      <button className="options" id={trackId.toString()} >
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
  
      { selectedTrack === trackId && clickedPlaylists ? (
        <div>
          <div id={trackId.toString()} className={classes.backArrow}>
            &#x21E6;
          </div> 
          <div>{playlists.map(item => (
            <div onClick={addToPlaylist} id={item.id.toString()} key={item.id}  >{item.title} </div>
          ))} </div>
        </div>
      ) : (
        false
      )}
       
    </div>
  );
};
export default TracksOptions;
