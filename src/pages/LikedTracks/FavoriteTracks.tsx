/** @format */
"use client";
import { useContext, useEffect } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { LikedTracksContext } from "../../feautures/likedTracks/likedTracksProvider";
import { ErrorBoundary, useErrorBoundary, withErrorBoundary } from "react-error-boundary";


const FavoriteTracks = () => {
  const { favoriteTracks, isLoading, getNextTracks } = useContext(LikedTracksContext);

  return (

    <PageWrapper>
      {/* <div> */}
        {isLoading ? (
          <span>loading...</span>
        ) : null}
       {favoriteTracks? <Tracklist
          nextTracks={() => {}}
            emptyState="У Вас немає улюблених треків"
            tracks={favoriteTracks}
          /> : null}
      {/* </div> */}
    </PageWrapper>

  );
};


export default FavoriteTracks