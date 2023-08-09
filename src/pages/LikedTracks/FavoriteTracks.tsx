/** @format */
import Tracklist from "../../components/Tracklist/Tracklist";
import useFetchTrackList from "../../feautures/api/hooks/deezer/useFetchTrackList";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import AddTrackToFavorite from "../AddTrackToFavorite/AddTrackToFavorite";

const FavoriteTracks = () => {

const tracks =  useFetchTrackList( {path:'/user/me/tracks'});
  return (
    <div  >
    <PageWrapper >
      <Tracklist tracks={tracks} error='' />
    </PageWrapper>
    </div>
  );
};

export default FavoriteTracks;
