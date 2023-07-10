/** @format */
import Tracklist from "../../components/Tracklist/Tracklist";
import useFetchFavoriteTracks from "../../feautures/api/hooks/deezer/useFetchFavoriteTracks";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import AddTrackToFavorite from "../AddTrackToFavorite/AddTrackToFavorite";

const FavoriteTracks = () => {

const tracks =  useFetchFavoriteTracks();

  return (
    <div  >
    <PageWrapper >
      <Tracklist tracks={tracks} error='' />
    </PageWrapper>
    </div>
  );
};

export default FavoriteTracks;
