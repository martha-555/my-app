/** @format */

import { ReactNode } from "react";
import Menu from "../Menu";
import classes from "./styles.module.scss";
import Player from "../../components/Player/Player";
import SearchTracks from "../../pages/Search/SearchTracks";
import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  const navigate = useNavigate()
  return (
    <div className={classes.container}>
      <Menu />
      <div className={classes.rightSide}>
        <div className={classes.content}>
          {/* <input onInput={()=> navigate('/search')}></input>
          <button onClick={()=> navigate('/search')}>Ok</button> */}
          <SearchTracks></SearchTracks>
          {children}
        </div>
        <Player />
      </div>
    </div>
  );
};

export default PageWrapper;
