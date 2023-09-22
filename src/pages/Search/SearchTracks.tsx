/** @format */

import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import classes from "./styles.module.scss";
import Tracklist from "../../components/Tracklist/Tracklist";
import { getSplicedTracks } from "../../utils/splicedTracks";
import TracksProvider, { TracksContext } from "../../feautures/Tracks/TracksProvider";

type Props = {
  children?: JSX.Element;
};

const SearchTracks = ({ children }: Props) => {

  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string | null>('');
  const [searchParams, setSearchParams] = useSearchParams({});
  const [page, setPage] = useState<number>(0)
  const [tracks, settracks] = useState<TrackData[]>([])
  const [fetchRequest, state] = useDeezerRequest<TrackData[]>();
  const {getSelectedPage} = useContext(TracksContext)

  useEffect(() => {
    if (searchParams.get("q")) {
      const searchRequest = async () => {
        const response = await fetchRequest({
          path: encodeURI(`/search?q=${searchParams.get("q")}`),
          parser: async (response) => {
            const json = await response.json();
            return json.data;
          },
        });
        // const spliced = getSplicedTracks(response)
        settracks(response);
        response.length === 0 && searchParams.get("q")
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
   if (inputValue) setSearchParams({ q: inputValue });
  };

//   const showPage = (e: React.MouseEvent<HTMLElement>) => {
//    const target = e.target as HTMLDivElement;
// setPage(+target.id);
//   }
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
      {searchParams.get("q") && state.isLoading === false ? <Tracklist tracks={tracks} /> : children}
      {error ? <div>{error} </div> : null}
      <div className={classes.flexPages}>
     {/* {tracks.map((item,index) =>  <div className={page === index? classes.clickedPage: ''} key={index} id={index.toString()} onClick={showPage} >{index + 1} </div>  )} */}
      </div>
    </div>
  );
};
export default SearchTracks;
