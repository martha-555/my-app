/** @format */

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (searchParams.get("q")) {

      const requestFetch = async () => {
      const response = await fetchRequest(
          encodeURI(`/search?q=${searchParams.get("q")}`)
          );
          const list = await response.json();
      list.data.length === 0 && searchParams.get("q")? setError("По Вашому запиту нічого не знайдено") : setError('');
    setTracks(list.data)
      };
      requestFetch()
  }
  },[searchParams,fetchRequest])


useEffect(() => {
  searchParams.get("q")? setInputValue(searchParams.get("q")): setInputValue('')
},[searchParams])


  const buttonOnClick = () =>{
     inputValue? setSearchParams({ q: inputValue }): setSearchParams({});
  }

  return (
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
      
     { searchParams.get('q')  ? <Tracklist tracks={tracks} error={error} />: children}
      </div>
  );
};
export default SearchTracks;
