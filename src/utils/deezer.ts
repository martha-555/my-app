/** @format */

import { TrackData } from "../types/deezer";

export const parseDeezerTrack = (response: any): TrackData => ({
  album: {
    cover: response.album.cover_xl,
    id: response.album.id,
    title: response.album.title,
  },
  artist: {
    name: response.artist.name,
    picture: response.artist.picture_xl,
    id: response.artist.id,
  },
  duration: response.duration,
  id: response.id,
  title: response.title,
  time_add: response.time_add
});
