import { useCallback, useEffect, useState } from "react";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { TrackData } from "../../types/deezer";
import { parseDeezerTrack } from "../../utils/deezer";
import { HttpMethod } from "../../feautures/api/types";

type Props = {
    id:number,
    title:string,
    trackId:number,
    setshowMessage:React.Dispatch<React.SetStateAction<boolean>>,
    setMessage:React.Dispatch<React.SetStateAction<string>>,
}

const AddSongToPlaylist = ({id,title,setshowMessage,trackId,setMessage}:Props) => {
  const request = useDeezerRequest();

    const addSong = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
          setshowMessage(true);
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
        [trackId, setMessage,request]
      );
 
    return (
         <div id={id.toString()}
              onClick={addSong}
              key={id} >
              {title}
            </div>
    )
}

export default AddSongToPlaylist;