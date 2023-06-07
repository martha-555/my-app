/** @format */

import { ReactNode } from "react";
import Menu from "../Menu";
import classes from "./styles.module.scss";
import Player from "../../components/Player/Player";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className={classes.container}>
      <Menu />
      <div className={classes.rightSide}>
        <div className={classes.content}>{children}</div>
        <Player />
      </div>
    </div>
  );
};

export default PageWrapper;
