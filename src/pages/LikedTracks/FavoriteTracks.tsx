/** @format */
"use client";
import { useContext, useEffect } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { LikedTracksContext } from "../../feautures/likedTracks/likedTracksProvider";
import {
  ErrorBoundary,
  useErrorBoundary,
  withErrorBoundary,
} from "react-error-boundary";

const FavoriteTracks = () => {
  const { favoriteTracks, isLoading, getNextTracks } =
    useContext(LikedTracksContext);

  return (
    <PageWrapper>
      {/* {isLoading ? (
          <div style={{textAlign: 'center'}}>loading...</div>
        ) : null} */}
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
