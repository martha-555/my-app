/** @format */

import { useSearchParams } from "react-router-dom";
import Tracklist from "../../components/Tracklist/Tracklist";
import useFetchSearch from "../../feautures/api/hooks/deezer/useFetchSearch";
import Menu from "../../layout/Menu";
import React, { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";

const SearchTracks = () => {
  const [value,setvalue] = useState<string>('');
 const [tracks,setTracks] = useState<TrackData[]>([])
 const fetchRequest = useDeezerRequest();

const searchRequest = () => {
  const requestFetch = async() => {
const response = await fetchRequest(`/search?q=${value}`);
const res = await response.json();
console.log(res)
  }
  requestFetch()
}
  return (
    <PageWrapper>
      <input type="text" placeholder="search" onInput={(e) => setvalue((e.target as HTMLInputElement).value)} />
    {value?<Tracklist tracks={tracks}/>:null}  
      <button onClick={searchRequest} >Ok</button>
    </PageWrapper>
  );
};
export default SearchTracks;
