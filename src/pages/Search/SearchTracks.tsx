/** @format */

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResponseTrackData, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from "./styles.module.scss";
import Tracklist from "../../components/Tracklist/Tracklist";
import nextTracksRequest from "../../utils/nextTracksRequest";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";
import { getNextTracks } from "../../utils/updateNextTracks";

type Props = {
  children?: JSX.Element;
};

const SearchTracks = ({ children }: Props) => {

  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string | null>('');
  const [backendRequest] = useBackendRequest()
  const [searchParams, setSearchParams] = useSearchParams();
  const [tracks, settracks] = useState<TrackData[]>([])
  const [nextTracksUrl, setNextTracksUrl] = useState<string>('');
  const [nextTracks, setnextTracks] = useState<TrackData[]>([])
  const [total, setTotal] = useState<number>(0)
  const [fetchRequest, state] = useDeezerRequest<ResponseTrackData>();

  useEffect(() => {
    if (searchParams.get("q")) {
      const searchRequest = async () => {
        const response = await fetchRequest({
          path: encodeURI(`/search?q=${searchParams.get("q")}`),
          parser: async (response) => {
            const json = await response.json();
           setTotal(json.total)
            setNextTracksUrl(json.next)
            return json;
          },
        });


       if (state.isLoading === false) settracks(response.data);
        response.data.length === 0 && searchParams.get("q")
          ? setError("По Вашому запиту нічого не знайдено")
          : setError("");
      };
      searchRequest();
    }
    

  }, [searchParams.get('q')]);

  useEffect(() => {
    searchParams.get("q")
      ? setInputValue(searchParams.get("q"))
      : setInputValue("");
    }, [searchParams.get('q')]);


  const buttonOnClick = () => {
  //  if (inputValue){ searchParams.set( 'q', inputValue ); setSearchParams(searchParams)};
   if (inputValue){ setSearchParams( {'q': inputValue} )}
  };

  const getNextTracks = async () => {
  const newUrl = nextTracksUrl.slice(0, nextTracksUrl.length-2);
  if (nextTracksUrl) {
    console.log({tracks})
console.log(tracks.length)
    const tracklist = await nextTracksRequest({path: `${newUrl}${tracks.length+1}&limit=3`, parser: async(res:any) => {const json = res.json();return json},request:backendRequest});
const data: TrackData[] = tracklist.data;
data.push(...tracks);
setnextTracks(data)
// console.log(data)
}
}
useEffect(() => {
  settracks(nextTracks);

},[nextTracks])

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
      {searchParams.get("q") && state.isLoading === false ?  <Tracklist total={total} nextTracks={getNextTracks} tracks={tracks} />: children}
      {error && searchParams.get('q')? <div>{error} </div> : null}
      <div className={classes.flexPages}>
      </div>
    </div>
  );
};
export default SearchTracks;
