/** @format */

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResponseTrackData, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from "./styles.module.scss";
import Tracklist from "../../components/Tracklist/Tracklist";
import connectWithoutDuplicates from "../../utils/connectWithoutDuplicates";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";

const SearchTracks = () => {
  const [searchParams] = useSearchParams();
  const [tracks, settracks] = useState<TrackData[]>([]);
  const [fetchRequest, state] = useDeezerRequest<ResponseTrackData>();
 
  const initialTracks = async () => {
    const response = await searchTracksRequest(0);
     settracks(response || [])
  } 
useEffect(() => {
   settracks([]);
   initialTracks()
  }, [searchParams.get('q')]);
  

  const searchTracksRequest =  async (index:number) => {
    if (!state.isLoading) {
      const response = await fetchRequest({
        path: encodeURI(
          `/search?q=${searchParams.get('q')}&index=${index}&limit=30`
        ),
        parser: async (response) => {
          const json = await response.json();
          return json;
        },
      });
      return response.data
    }
  };

  const getNextTracks = async () => {
 const data = await searchTracksRequest(tracks.length);
  if (data) settracks(connectWithoutDuplicates(tracks, data));
  }

  return (
    <PageWrapper>
    <div className={classes.mainContainer}>
      <div className={classes.inputBlock}>
      </div>
    {!state.isLoading? <Tracklist
        nextTracks={getNextTracks}
        tracks={tracks}
        emptyState="По Вашому запиту нічого не знайдено"
        isLoading={state.isLoading}
      />: null}
      <div className={classes.flexPages}></div>
    </div>
    </PageWrapper>
  );
};
export default SearchTracks;
