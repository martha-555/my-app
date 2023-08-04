/** @format */

import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from "./styles.module.scss";
import Tracklist from "../../components/Tracklist/Tracklist";

type Props = {
  children?:JSX.Element
}

const SearchTracks = ({children}:Props) => {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [error, setError] = useState<string>("");
const [inputValue, setInputValue] = useState<any>('')
  const [searchParams, setSearchParams] = useSearchParams({});
  const fetchRequest = useDeezerRequest();
  const [isLoading, setIsLoading] = useState<boolean>(false)

const searchRequest = useCallback(
  () => {
    if (searchParams.get("q")) {
      const requestFetch = async () => {
        const response = await fetchRequest(
          encodeURI(`/search?q=${searchParams.get("q")}`)
          );
   response.status === 200 && setIsLoading(true);
        const list = await response.json();
        setTracks(list.data);
      };
      requestFetch()
  }
},[searchParams,tracks]
) 
useEffect(() => {
if(searchParams.get("q")) setInputValue(searchParams.get("q"))
},[])

useEffect(() => {
  if (searchParams.get("q")) searchRequest();
  if  (searchParams.get('q') === null) setInputValue('');
 
},[searchParams])

useEffect(() => {
  tracks.length === 0 && searchParams.get("q") !== null && isLoading? setError("По Вашому запиту нічого не знайдено") : setError('')
},[searchParams,tracks,isLoading])

  const buttonOnClick = () =>{
     inputValue? setSearchParams({ q: inputValue }): setSearchParams({});
      // searchParams.get('q') === 'empty' ? setError("Введіть значення") : setError('') ;
  }

  return (
//  <PageWrapper>
<div className={classes.mainContainer}>
      <div className={classes.inputBlock}>
        <input
          type="text"
          placeholder="search"
          value={inputValue}
          onKeyUp={(e) => {
            if (e.key === "Enter") buttonOnClick();
          }}
          onInput={(e) => {
            const target = (e.target as HTMLInputElement)
           setInputValue(target.value)
          }}
        />
        <button onClick={buttonOnClick}>Ok</button>
      </div>
     { (tracks?.length > 0 && searchParams.get('q') !== null) || error ? <Tracklist tracks={tracks} error={error} />: children}
      </div>
      // </PageWrapper>
  );
};
export default SearchTracks;
