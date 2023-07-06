/** @format */
import useFetchFavoriteTracks from "../../feautures/api/hooks/deezer/useFetchFavoriteTracks";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import AddTrackToFavorite from "../AddTrackToFavorite/AddTrackToFavorite";

const FavoriteTracks = () => {

const tracks =  useFetchFavoriteTracks();

  return (
    <div  >
    <PageWrapper >
      <AddTrackToFavorite tracks={tracks} error='' />
    </PageWrapper>
    </div>
  );
};

export default FavoriteTracks;
