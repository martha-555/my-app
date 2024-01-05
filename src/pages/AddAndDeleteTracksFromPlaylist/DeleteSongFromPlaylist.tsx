/** @format */

import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";

type Props = {
  trackId: number;
  playlistId: any;
};

const DeleteSongFromPlaylist = ({ trackId, playlistId }: Props) => {
  // playlist/{playlist_id}/tracks
  const [request] = useDeezerRequest();
  const removeTrack = () => {
    request({
      path: `/playlist/${playlistId}/track_id=${trackId}`,
      method: HttpMethod.DELETE,
      parser: async () => null,
    });
  };

  return (
    <>
      <div onClick={removeTrack}>Видалити з плейлиста</div>
    </>
  );
};
export default DeleteSongFromPlaylist;
