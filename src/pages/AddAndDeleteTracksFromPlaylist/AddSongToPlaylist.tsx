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
  setshowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  clickedPlaylist:any;
  clickedOption:any

};

const AddSongToPlaylist = ({
  id,
  title,
  setshowMessage,
  trackId,
  setMessage,
  clickedOption,
  clickedPlaylist
}: Props) => {

  const [requestAction] = useDeezerRequest();
  const [request] = useDeezerRequest<TrackData[]>()
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const {playlists} = useContext(PlaylistsContext);

  const clickAddButton = ( ) => {
    setAddClicked(!addClicked)
  }

  const addSong =(e: React.SyntheticEvent) => {
    const target = e.target as  HTMLDivElement;
    const returnTracklist = async () => {
      const tracksInPlaylist = await request({path:`/playlist/${target.id}/tracks`,parser: async (response) =>{const json = await response.json();return json.data.map(parseDeezerTrack) } });
   
          console.log(tracksInPlaylist)
    }
    returnTracklist()
requestAction({path:`/playlist/${target.id}/tracks&songs=${trackId}`,method:HttpMethod.POST,parser: async () => null});

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
      {clickedPlaylist === false?<div onClick={clickAddButton} className="addToPlaylist" id={trackId.toString()}>
            Додати в плейлист
          </div>: null}
     
          { clickedPlaylist ? <div>{playlists.map(item => (
            <div id={item.id.toString()} key={item.id} onClick={addSong} >{item.title} </div>
          ))} </div>: null }
    </div>
  );
};

export default AddSongToPlaylist;
