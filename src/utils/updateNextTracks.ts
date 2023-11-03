import { TrackData } from "../types/deezer";
import nextTracksRequest from "./nextTracksRequest";
import useBackendRequest from "../feautures/api/hooks/useBackendRequest";
import { request } from "https";

export const getNextTracks = async (page:number,nextTracksUrl:string,settracks:any,request:any ) => {
    const newUrl = nextTracksUrl.slice(0, nextTracksUrl.length-2);
    if (nextTracksUrl) {
      const tracklist = await nextTracksRequest({path: `${newUrl}${(page-1)*25}&limit=25`, parser: async(res:any) => {const json = res.json();return json},request:request});
  const data: TrackData[] = tracklist.data;
  settracks(data);
      }
  }