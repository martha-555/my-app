/** @format */

import Track from "../../components/Track";
import { TrackData } from "../../types/deezer";


type Props = {
  tracks: TrackData[];
  error: string;
};

// /user/me/playlists&title=namr
const AddTrackToFavorite = ({ tracks, error }: Props) => {

  return (
    <div>
      {tracks?.length  > 0 ? (
        tracks.map((item) => (
          <Track track={item} key={item.id}/> 
        ))
      ) : (
        <div>{error} </div>
      )}
    </div>
  );
};
export default AddTrackToFavorite;
