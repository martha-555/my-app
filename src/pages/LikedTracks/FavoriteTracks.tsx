/** @format */

import Menu from "../../layout/Menu";
import classes from "./styles.module.scss";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";

const FavoriteTracks = () => {
  const request = useDeezerRequest();
  request("/search/artist/?q=eminem");

  return (
    <div>
      <Menu />
    </div>
  );
};

export default FavoriteTracks;
