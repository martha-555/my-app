/** @format */
"use client";

import { ReactNode, useState } from "react";
import Menu from "../Menu";
import classes from "./styles.module.scss";
import Player from "../Player/Player";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string | null>(
    searchParams.get("q")
  );

  return (
    <div className={classes.containerWrapper}>
      <Menu />
      <div className={classes.rightSide}>
        <div className={classes.content}>
          <div className={classes.flexWrapper}>
            <input
              className={classes.searchInput}
              type="text"
              placeholder="Search tracks, artists..."
              value={inputValue || ""}
              onKeyUp={(e) => {
                if (e.key === "Enter") navigate(`/search?q=${inputValue}`);
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                setInputValue(target.value);
              }}
            />
            <Auth />
          </div>
          {children}
        </div>
        <Player />
      </div>
    </div>
  );
};

export default PageWrapper;
