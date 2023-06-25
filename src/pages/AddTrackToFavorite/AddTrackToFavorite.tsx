/** @format */

import Track from "../../components/Track";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";
import { TrackData } from "../../types/deezer";

type Props = {
  tracks: TrackData[];
  error: string;
};
//   `/playlist/11185422824/tracks&songs=${e.target.id}`,

const AddTrackToFavorite = ({ tracks, error }: Props) => {
  const request = useDeezerRequest();
  const handleClick = (e: any) => {
    const fetchRequest = async () => {
      await request(`/playlists/title=llll`, HttpMethod.POST);
    };
    fetchRequest();
  };
  return (
    <div>
      {tracks && tracks.length > 0 ? (
        tracks.map((item) => (
          <Track track={item} key={item.id}>
            <button id={item.id.toString()} onClick={handleClick}>
              +
            </button>
          </Track>
        ))
      ) : (
        <div>{error} </div>
      )}
    </div>
  );
};
export default AddTrackToFavorite;
