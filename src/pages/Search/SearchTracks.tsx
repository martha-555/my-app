/** @format */

import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ResponseTrackData, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from "./styles.module.scss";
import Tracklist from "../../components/Tracklist/Tracklist";
import { getSplicedTracks } from "../../utils/splicedTracks";
import TracksProvider, { TracksContext } from "../../feautures/Tracks/TracksProvider";
import useNextTracksRequest from "../../feautures/api/hooks/deezer/useNextTracksRequest";
import nextTracksRequest from "../../utils/nextTracksRequest";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";

type Props = {
  children?: JSX.Element;
};

const SearchTracks = ({ children }: Props) => {

  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string | null>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [tracks, settracks] = useState<TrackData[]>([])
  const [nextTracks, setNextTracks] = useState<string>('');
  const [fetchRequest, state] = useDeezerRequest<ResponseTrackData>();
  const [request] = useNextTracksRequest<ResponseTrackData>()
  const [backendRequest] = useBackendRequest()
  const {getSelectedPage} = useContext(TracksContext)

  useEffect(() => {
    if (searchParams.get("q")) {
      const searchRequest = async () => {
        const response = await fetchRequest({
          path: encodeURI(`/search?q=${searchParams.get("q")}`),
          parser: async (response) => {
            const json = await response.json();
            setNextTracks(json.next)
            return json;
          },
        });

if (response.next) {
  const tracks = await nextTracksRequest({path: response.next, parser: async(res:any) => {const json = res.json();return json},request:backendRequest})
  console.log(tracks)
  // const next = async() => { 
//   const a = await request({path: response.next, parser: async(res) => {const json = res.json();return json}});
//   console.log({a});
//   return a;
// } 
// next()
// console.log(next)

}
       if (state.isLoading === false) settracks(response.data);
        response.data.length === 0 && searchParams.get("q")
          ? setError("По Вашому запиту нічого не знайдено")
          : setError("");
      };
      searchRequest();
    }
    
  }, [searchParams, fetchRequest]);

  useEffect(() => {
    searchParams.get("q")
      ? setInputValue(searchParams.get("q"))
      : setInputValue("");
  }, [searchParams]);

  const buttonOnClick = () => {
  //  if (inputValue){ searchParams.set( 'q', inputValue ); setSearchParams(searchParams)};
   if (inputValue){ setSearchParams( {'q': inputValue} )}

  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.inputBlock}>
        <input
          type="text"
          placeholder="search"
          value={inputValue || ''}
          onKeyUp={(e) => {
            if (e.key === "Enter") buttonOnClick();
          }}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setInputValue(target.value);
          }}
        />
        <button onClick={buttonOnClick}>Ok</button>
      </div>
      {searchParams.get("q") && state.isLoading === false ? <Tracklist next={nextTracks} tracks={tracks} /> : children}
      {error ? <div>{error} </div> : null}
      <div className={classes.flexPages}>
      </div>
    </div>
  );
};
export default SearchTracks;
