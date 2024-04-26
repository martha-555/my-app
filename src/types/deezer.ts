/** @format */

import { type } from "os";

export type Artist = {
  name: string;
  picture: string;
  id: number;
};

export type Album = {
  cover: string;
  id: number;
  title: string;
};

export type TrackData = {
  album: Album;
  artist: Artist;
  duration: number;
  id: number;
  title: string;
  time_add: number
};
export type ResponseTrackData = {
  data: TrackData[];
  next: string;
  total: number
}

export type Playlist = {
  id: number;
  title:string;
  is_loved_track:boolean;
  image:string
}
