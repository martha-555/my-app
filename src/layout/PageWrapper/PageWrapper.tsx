/** @format */

import { ReactNode } from "react";
import Menu from "../Menu";
import classes from "./styles.module.scss";
import Player from "../../components/Player/Player";
import SearchTracks from "../../pages/Search/SearchTracks";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className={classes.container}>
      <Menu />
      <div className={classes.rightSide}>
        <div className={classes.content}>
          <input></input>
          {children}{" "}
        </div>
        <Player />
      </div>
    </div>
  );
};

export default PageWrapper;
