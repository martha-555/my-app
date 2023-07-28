/** @format */

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from "./styles.module.scss";
import Tracklist from "../../components/Tracklist/Tracklist";



const SearchTracks = () => {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [error, setError] = useState<string>("");
const [inputValue, setInputValue] = useState<any>('')
  const [searchParams, setSearchParams] = useSearchParams({});
  const fetchRequest = useDeezerRequest();

const searchRequest = 
  () => {
    if (searchParams.get("q")) {
      const requestFetch = async () => {
        const response = await fetchRequest(
          encodeURI(`/search?q=${searchParams.get("q")}`)
        );
        const list = await response.json();
        setTracks(list.data);
        if ((searchParams.get("q") !== '') && tracks?.length === 0 && inputValue !== '') setError("По Вашому запиту нічого не знайдено")
      };
      requestFetch();
    }
  }
useEffect(() => {
if(searchParams.get("q")) setInputValue(searchParams.get("q"))
},[])

useEffect(() => {
  if (searchParams.get("q")) searchRequest();
 
},[searchParams])


  const buttonOnClick = () =>{
      if (inputValue)  setSearchParams({ q: inputValue });
      if ( inputValue === '' && tracks?.length === 0 ) setError("Введіть значення");
    }

  return (
    <PageWrapper>
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
      <Tracklist tracks={tracks} error={error} />
    </PageWrapper>
  );
};
export default SearchTracks;
