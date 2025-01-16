/** @format */

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authContext } from "../../feautures/auth/authProvider";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";
import { HttpMethod } from "../../feautures/api/types";
import useIsAuthorize from "../../feautures/auth/hooks/useIsAuthorize";
import classes from "./styles.module.scss";
import logo from "../../icons/logo/pngegg (15).png";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { updateAuthKey } = useContext(authContext);
  const [makeRequest] = useBackendRequest<string>();
  const isAuth = useIsAuthorize();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;
      isAuth && target.className.includes("authButton")
        ? setIsDelete(!isDelete)
        : setIsDelete(false);
      if (!isAuth && target.className.includes("enterButton"))
        window.location.replace(
          "https://connect.deezer.com/oauth/auth.php?app_id=624064&redirect_uri=https://my-app-two-phi-69.vercel.app/favorite&perms=basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history"
        );
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isAuth, isDelete]);

  useEffect(() => {
    if (code) {
      const fetchToken = async () => {
        const response = await makeRequest(
          {
            payload: {
              url: `https://connect.deezer.com/oauth/access_token.php?app_id=624064&secret=11a5835e77a7d217741adf23c059fa9b&code=${code}`,
              method: HttpMethod.GET,
            },
          },
          async (response) => response.text()
        );

        if (response === "wrong code") return;
        if (response) {
          const accessToken = response.split("=")[1].split("&");

          updateAuthKey(accessToken[0]);
        }
      };
      fetchToken();
    }
  }, [code]);

  return (
    <div className={classes.authContainer}>
      {isAuth ? (
        <button className={classes.authButton}>Log out</button>
      ) : (
        <div className={classes.startPageContainer}>
          <div className={classes.startPage}>
            <span className={classes.logo}>MUZa</span>

            <img className={classes.logoIcon} src={logo} alt="" />
            <button className={classes.enterButton}>Log in</button>
          </div>
        </div>
      )}
      {isDelete ? (
        <div
          className={classes.logOutMessage}
          onClick={() => updateAuthKey(null)}
        >
          Sign out of the account
        </div>
      ) : null}
    </div>
  );
};

export default Auth;
