import { TrackData } from "../types/deezer";
import { parseDeezerTrack } from "./deezer";

type Props = {
    updateState:React.Dispatch<React.SetStateAction<number[]>>,
    request:Function,
    likedList?: React.Dispatch<React.SetStateAction<TrackData[] >> ,

}

export const updateLikedTracks =({updateState,request,likedList}:Props) => {
    const updateTracks = async () => {
        const response = await request(`/user/me/tracks`);
        const trackList = await response.json();
        const parsed:TrackData[] = trackList.data.length >0? trackList.data.map(parseDeezerTrack):[];
        const id = parsed.map((item) => item.id);
    if (id.length > 0)  updateState(id);
    console.log('updateTracks')
       if (likedList && parsed.length > 0) likedList(parsed);
     
      };
updateTracks()
}