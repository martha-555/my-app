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
import { connect } from "http2";
import connectWithoutDuplicates from "../../utils/connectWithoutDuplicates";

type Props = {
  children?: JSX.Element;
};

const SearchTracks = () => {
  const [error, setError] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState<string | null>(
    searchParams.get("q")
  );
  const [backendRequest, nextTracksState] = useBackendRequest();
  const [tracks, settracks] = useState<TrackData[]>([]);
  const [nextTracksUrl, setNextTracksUrl] = useState<string>("");
  const [nextTracks, setnextTracks] = useState<TrackData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [fetchRequest, state] = useDeezerRequest<ResponseTrackData>();

  useEffect(() => {
    if (inputValue) {
      // const searchRequest = async () => {
      //   const response = await fetchRequest({
      //     path: encodeURI(`/search?q=${searchParams.get("q")}`),
      //     parser: async (response) => {
      //       const json = await response.json();
      //       setNextTracksUrl(json.next);
      //       return json;
      //     },
      //   });
      //   if (state.isLoading === false) settracks(response.data);
      //   response.data.length === 0 && searchParams.get("q")
      //     ? setError("По Вашому запиту нічого не знайдено")
      //     : setError("");
      // };
      // searchRequest();
      getNextTracks();
    }
  }, [inputValue]);

  useEffect(() => {
    searchParams.get("q")
      ? setInputValue(searchParams.get("q"))
      : setInputValue("");
  }, [searchParams.get("q")]);

  const buttonOnClick = () => {
    if (inputValue) {
      setSearchParams({ q: inputValue });
    }
  };

  const getNextTracks = async () => {
    if (!state.isLoading) {
      const response = await fetchRequest({
        path: encodeURI(
          `/search?q=${inputValue}&index=${tracks.length}&limit=30`
        ),
        parser: async (response) => {
          const json = await response.json();
          setNextTracksUrl(json.next);
          return json;
        },
      });
      settracks(connectWithoutDuplicates(tracks, response.data));
    }
  };

  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(tracks)));
  }, [tracks]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.inputBlock}>
        <input
          type="text"
          placeholder="search"
          value={inputValue || ""}
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
      <Tracklist
        nextTracks={getNextTracks}
        tracks={tracks}
        emptyState="По Вашому запиту нічого не знайдено"
      />
      <div className={classes.flexPages}></div>
    </div>
  );
};
export default SearchTracks;
