/** @format */

// for Vercel

import axios from "axios";
import { getInfo } from "@distube/ytdl-core";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { type, payload } = req.body;

    if (type === "Mp3") {
      let { query, trackId, videoId } = payload;

      if (!videoId) {
        try {
          videoId = await getFirstVideoId(query);
        } catch {
          res.status(404).json({ error: "Video id not found" });
          return;
        }
      }

      const mp3 = await getVideoMp3(videoId);
      res.status(200).json({ data: { trackId, videoId, mp3 } });
      return;
    }

    // інші типи запитів
  } else {
    res.status(404).send("Method not allowed");
  }
}

const getFirstVideoId = async (query) => {
  const searchResponse = await axios.get(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
  );
  const html = searchResponse.data;
  const matched = html.match(/watch\?v=(.*)\\"/gm);
  if (matched) {
    const stringWithId = matched[0].split('"')[0];
    const id = stringWithId.slice(stringWithId.indexOf("=") + 1);
    return id;
  }
  throw new Error("Video id not found");
};

const getVideoMp3 = async (id) => {
  const response = await getInfo(`http://www.youtube.com/watch?v=${id}`);
  const targetFormat = response.formats.find((format) => format.itag === 140);
  return targetFormat ? targetFormat.url : null;
};
