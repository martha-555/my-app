import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../auth/authProvider";
import useDeezerRequest from "./useDeezerRequest";
import { TrackData } from "../../../../types/deezer";

const useFetchSearch = (inputValue:string) => {
    const [searchMusic, setSearchMusic] = useState<TrackData[]>([])
    const {authKey} = useContext(authContext);
    const request = useDeezerRequest();

    useEffect(() => {
      const fetchRequest = async () => {
    const response = await request( `/search?q=${inputValue}`);
    const searchResult = await response.json();
    setSearchMusic(searchResult.data)
        }
        fetchRequest()
    },[authKey,request])
return searchMusic;
}
export default useFetchSearch;