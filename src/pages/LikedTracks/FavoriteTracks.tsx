/** @format */
import { useContext, useEffect } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { LikedTracksContext } from "../../feautures/likedTracks/likedTracksProvider";
import { useLocation } from "react-router";

const FavoriteTracks = () => {
  const { favoriteTracks, isLoading } = useContext(LikedTracksContext);
  // useEffect(() => {
  //   makeRequest("me");
  // }, []);
const location = useLocation();
  return (
    <PageWrapper>
      <div>
        {isLoading &&location.pathname == '/favorite'? (
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
