/** @format */

import { useSearchParams } from "react-router-dom";
import Tracklist from "../../components/Tracklist/Tracklist";

import React, { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from './styles.module.scss';

const SearchTracks = () => {
  const [value,setvalue] = useState<string>('');
 const [tracks,setTracks] = useState<TrackData[]>([])
 const [error, setError] = useState<string>('');
 const fetchRequest = useDeezerRequest();

const searchRequest = () => {
  const requestFetch = async() => {
const response = await fetchRequest(encodeURI( `/search?q=${value}`));
const list = await response.json();
setTracks(list.data)


}
requestFetch()
}

useEffect(() => {
  if (tracks) {
    setError(value && tracks.length === 0?'По Вашому запиту нічого не знайдено': '')
  } else {setError('Введіть значення')}
},[tracks])

  return (
    <PageWrapper>
      <div className={classes.inputBlock}>
      <input type="text" placeholder="search" onKeyUp={(e) => {if (e.key === 'Enter') searchRequest()}}  onChange={
        (e) =>{ { setvalue((e.target as HTMLInputElement).value)}
        }} />
      <button onClick={searchRequest} >Ok</button>
      </div>
 { tracks && tracks.length > 0?  <Tracklist tracks={tracks}/>: <div>{error} </div> }
    </PageWrapper>
  );
};
export default SearchTracks;
