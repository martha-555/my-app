/** @format */
import { useContext, useEffect } from "react";
import Tracklist from "../../components/Tracklist/Tracklist";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { LikedTracksContext } from "../../feautures/likedTracks/likedTracksProvider";

const FavoriteTracks = () => {
  const { favoriteTracks, isLoading } = useContext(LikedTracksContext);
  // useEffect(() => {
  //   makeRequest("me");
  // }, []);

  return (
    <PageWrapper>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <Tracklist tracks={favoriteTracks} />
      )}
    </PageWrapper>
  );
};

export default FavoriteTracks;
