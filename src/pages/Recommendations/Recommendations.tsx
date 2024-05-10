/** @format */

import { useEffect, useState } from "react";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { TrackData } from "../../types/deezer";
import { parseDeezerTrack } from "../../utils/deezer";
import Tracklist from "../../components/Tracklist/Tracklist";

//'/user/me/recommendations/tracks'
const Recommendations = () => {

  const [request] = useDeezerRequest<TrackData[]>();
  const [tracks, setTracks] = useState<TrackData[]>([])

  const getTracks = async () => {
    const tracks = await request({ path: '/user/me/recommendations/tracks',
      parser: async (response) => {
        const json = await response.json();
        return json.data?.map(parseDeezerTrack);
      }});
if (tracks) setTracks(tracks)
  }

  useEffect(() => {
getTracks()
 },[])
  return (
      <PageWrapper>
   <Tracklist tracks={tracks} nextTracks={() => {}} emptyState=''/>
      </PageWrapper>
  );
};

export default Recommendations;
