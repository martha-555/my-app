import { TrackData } from "../types/deezer";

export const getSplicedTracks = (response:TrackData[]):TrackData[][] => {
    const spliceResponse = []
    while (response.length) {
      spliceResponse.push(response.splice(0,5));
}
return spliceResponse;
}