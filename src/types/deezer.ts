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
};

export type Playlist = {
  id: number;
  title:string
}