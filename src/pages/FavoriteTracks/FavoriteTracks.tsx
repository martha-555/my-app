/** @format */
"use client";
import { useContext } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import { LikedTracksContext } from "../../feautures/likedTracksContext/likedTracksProvider";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const FavoriteTracks = () => {
  const { favoriteTracks, isLoading, getNextTracks } =
    useContext(LikedTracksContext);

  return (
    <PageWrapper>
      {favoriteTracks ? (
        <Tracklist
          nextTracks={() => {}}
          emptyState="У Вас немає улюблених треків"
          tracks={favoriteTracks}
        />
      ) : null}
    </PageWrapper>
  );
};

export default FavoriteTracks;
