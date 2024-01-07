/** @format */
import { useContext, useEffect } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { LikedTracksContext } from "../../feautures/likedTracks/likedTracksProvider";
import { useLocation } from "react-router";
import { authContext } from "../../feautures/auth/authProvider";

const FavoriteTracks = () => {
  const { favoriteTracks, isLoading } = useContext(LikedTracksContext);

  return (
    <PageWrapper>
      <div>
        {isLoading ? (
          <span>loading...</span>
        ) : (
          <Tracklist
            emptyState="У Вас немає улюблених треків"
            tracks={favoriteTracks}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default FavoriteTracks;
