/** @format */

import { ReactNode } from "react";
import Menu from "../Menu";
import classes from "./styles.module.scss";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className={classes.container}>
      <Menu />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default PageWrapper;
