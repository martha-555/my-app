/** @format */
import Tracklist from "../../components/Tracklist/Tracklist";
import useFetchFavoriteTracks from "../../feautures/api/hooks/deezer/useFetchTrackList";
import useFetchTrackList from "../../feautures/api/hooks/deezer/useFetchTrackList";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import AddTrackToFavorite from "../AddTrackToFavorite/AddTrackToFavorite";

const FavoriteTracks = () => {
  const { data, isLoading } = useFetchFavoriteTracks();
  console.log({ data });

  return (
    <PageWrapper>
      {isLoading ? <span>loading...</span> : <Tracklist tracks={data} />}
    </PageWrapper>
  );
};

export default FavoriteTracks;
