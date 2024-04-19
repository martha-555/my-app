/** @format */

import { useContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import { useSearchParams } from "react-router-dom";
import classes from "./styles.module.scss";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";
import optionIcon from '../../icons/icon-park_more.png';
import toast, { Toaster } from 'react-hot-toast';


type Props = {
  track: TrackData;
};

const TracksOptions = ({ track }: Props) => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [deleteTrack, setDeleteTrack] = useState<boolean>(false);
  const [parsedPlaylists, setParsedPlaylists] = useState<Playlist[]>([]);
  const [clickedOption, setclickedOption] = useState<boolean>(false);
  const [clickedAddButton, setclickedAddButton] = useState<boolean>(false);
  const [searchParams] = useSearchParams({});

  const notify = () => toast(message, {
    duration: 1500,
    style:{
      // background: '#818486'
    }
  });

 

  const { playlists, addToPlaylist, deleteFromPlaylist, isLoadingResponse } =
    useContext(PlaylistsContext);

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
     
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [selectedTrack, clickedOption, clickedAddButton, deleteTrack, track.id]);

  const addSongToPlaylist = async (e: any) => {

    const target = e.target;

    const response = async () => {
      const code = await addToPlaylist(track, target.id);
      typeof code == "boolean"
        ? setMessage("Трек додано")
        : setMessage("Вже є у плейлисті");
    };
    response();

  };

useEffect(() => {
if (message) notify()
},[message])

  const deleteSongFromPlaylist = () => {
    deleteFromPlaylist(track, Number(searchParams.get("playlist")));
    setMessage('Трек видалено')
  };


 
  return (
    <>
      <Toaster />
      <img className="options" id={track.id.toString()} src={optionIcon} alt="" />
     
      <div className={classes.optionContainer}>
     <div>

        {selectedTrack === track.id && clickedOption ? (
          <div className={classes.fixedSize}>
            <div className={classes.addToPlaylist} id={track.id.toString()}>
              Додати в плейлист
            </div>

{searchParams.get("playlist")? <div id={track.id.toString()} className={classes.deleteFromPlaylist}>
            Видалити з плейлиста
          </div> : null }
          </div>
        ) : null}


      {selectedTrack === track.id && (clickedAddButton || deleteTrack) ? (
        <div className={classes.playlists}>
        <div id={track.id.toString()} className={classes.backArrow}>
            &#x21E6;
          </div>
          {clickedAddButton
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
          {deleteTrack? (
        <div id={track.id.toString()} onClick={deleteSongFromPlaylist}>
          Видалити трек?
        </div>
      ) : null}
          </div>
      ) : (
        false
      )}   
      </div>
      </div>
    </>
  );
};

export default TracksOptions;
