/** @format */
"use client";
import { useContext, useEffect } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { LikedTracksContext } from "../../feautures/likedTracks/likedTracksProvider";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";


const FavoriteTracks = () => {
  const { favoriteTracks, isLoading, getNextTracks } = useContext(LikedTracksContext);
      // const { showBoundary } = useErrorBoundary();
// console.log(showBoundary)
// const { showBoundary } = useErrorBoundary();
  return (
<ErrorBoundary fallback={ <div>hhhhhhhhhh</div> }>
    <PageWrapper>
      <div>
        {isLoading ? (
          <span>loading...</span>
        ) : null}
       {favoriteTracks? <Tracklist
          nextTracks={() => {}}
            emptyState="У Вас немає улюблених треків"
            tracks={favoriteTracks}
          /> : null}
      </div>
    </PageWrapper>
    </ErrorBoundary>
  );
};

export default FavoriteTracks;
