/** @format */

import { useCallback, useContext, useEffect, useState } from "react";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { TrackData } from "../../types/deezer";
import { parseDeezerTrack } from "../../utils/deezer";
import { HttpMethod } from "../../feautures/api/types";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";


type Props = {
  id: number;
  title: string;
  trackId: number;
  
  clickedPlaylist:boolean;
  clickedOption:boolean

};

const AddSongToPlaylist = ({
  id,
  title,
  trackId,

  clickedOption,
  clickedPlaylist
}: Props) => {

  const [inTracklist, setInTracklist] = useState<TrackData[]>([]);
  const [showMessage, setshowMessage] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [requestAction] = useDeezerRequest();
  const [request] = useDeezerRequest<TrackData[]>()
  const [clickedId, setClicedId] = useState(0)
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const {playlists} = useContext(PlaylistsContext);

  const clickAddButton = ( ) => {
    setAddClicked(!addClicked)
  }

  const addSong =(e: React.SyntheticEvent) => {
    setshowMessage(true)
    const target = e.target as  HTMLDivElement;
    setClicedId(+target.id)
    const returnTracklist = async () => {
      const tracksInPlaylist = await request({path:`/playlist/${target.id}/tracks`,parser: async (response) =>{const json = await response.json();return json.data.map(parseDeezerTrack) } });
      setInTracklist(tracksInPlaylist.filter((item) => item.id === trackId));
    }

    inTracklist?.length > 0
    ? setMessage("Вже є у плейлисті")
    : requestAction({path:`/playlist/${target.id}/tracks&songs=${trackId}`,method:HttpMethod.POST,parser: async () => null});setMessage("Трек додано");
    returnTracklist()
    // if (target.className.includes("backArrow")) setclickedOption(true);
    // setTimeout(() => {
    //   setshowMessage(false);
    // }, 4000);
  }



    // async (e: React.MouseEvent<HTMLElement>) => {
      // setshowMessage(true);
      // const target = e.target as HTMLElement;
      // const response = await request({path:`/playlist/${target.id}/tracks`,});
      // const tracks = await response.json();
      // const parsed: TrackData[] = tracks?.data?.map(parseDeezerTrack);
      // const idInPlaylist = parsed.filter((item) => item.id === trackId);
      // idInPlaylist?.length > 0
      //   ? setMessage("Вже є у плейлисті")
      //   : (await request(
      //       `/playlist/${target.id}/tracks&songs=${trackId}`,
      //       HttpMethod.POST
      //     )) && setMessage("Трек додано");
    // },

  return (
    <div id={id.toString()}  key={id}>
     {showMessage? <div id={id.toString()} >333 </div>: null}
      {clickedPlaylist === false && clickedOption  ?<div onClick={clickAddButton} className="addToPlaylist" id={trackId.toString()}>
            Додати в плейлист 
          </div>: null}
     
          { clickedPlaylist ? <div>{playlists.map(item => (
            <div id={item.id.toString()} key={item.id} onClick={addSong} >{item.title} </div>
          ))} </div>: null }
    </div>
  );
};

export default AddSongToPlaylist;
