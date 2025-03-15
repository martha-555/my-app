/** @format */

import { useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import { parseDeezerTrack } from "../../utils/parseDeezerTrack";
import Tracklist from "../../components/Tracklist/Tracklist";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import useDeezerRequest from "../../apiHooks/hooks/deezer/useDeezerRequest";

//'/user/me/recommendations/tracks'
const Recommendations = () => {
  const [request] = useDeezerRequest<TrackData[]>();
  const [tracks, setTracks] = useState<TrackData[]>([]);

  const getTracks = async () => {
    const tracks = await request({
      path: "/user/me/recommendations/tracks",
      parser: async (response) => {
        const json = await response.json();
        return json.data?.map(parseDeezerTrack);
      },
    });
    if (tracks) setTracks(tracks);
  };

  useEffect(() => {
    getTracks();
  }, []);
  return (
    <PageWrapper>
      <Tracklist tracks={tracks} nextTracks={() => {}} emptyState="" />
    </PageWrapper>
  );
};

export default Recommendations;
