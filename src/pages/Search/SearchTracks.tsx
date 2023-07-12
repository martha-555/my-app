/** @format */

import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from "./styles.module.scss";
import AddTrackToFavorite from "../AddTrackToFavorite/AddTrackToFavorite";
import Tracklist from "../../components/Tracklist/Tracklist";



const SearchTracks = () => {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [error, setError] = useState<string>("");

  let [searchParams, setSearchParams] = useSearchParams({});
  const fetchRequest = useDeezerRequest();

const searchRequest = useCallback(() => {
  if (searchParams.get("q")) {
    const requestFetch = async () => {
      const response = await fetchRequest(
        encodeURI(`/search?q=${searchParams.get("q")}`)
      );
      const list = await response.json();
      setTracks(list.data);
    };
    requestFetch();
  }
},[searchParams.get("q")])


  const errorHandler = () => {
    if (searchParams.get("q") === null) setError("Введіть значення");
  };
  useEffect(() => {
    if (tracks) {
      setError(
        searchParams.get("q") && tracks?.length === 0
          ? "По Вашому запиту нічого не знайдено"
          : ""
      );
    }
  }, [tracks]);

  useEffect(() => {
    searchRequest();
  }, [searchParams.get("q")]);

  return (
    <PageWrapper>
      <div className={classes.inputBlock}>
        <input
          type="text"
          placeholder="search"
          value={searchParams.get("q") || ""}
          onKeyUp={(e) => {
            if (e.key === "Enter") errorHandler();
          }}
          onChange={(e) => {
            e.target.value
              ? setSearchParams({ q: e.target.value })
              : setSearchParams({});
          }}
        />
        <button onClick={errorHandler}>Ok</button>
      </div>
      <Tracklist tracks={tracks} error={error} />
    </PageWrapper>
  );
};
export default SearchTracks;
