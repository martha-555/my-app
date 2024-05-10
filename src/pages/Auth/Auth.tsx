/** @format */

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authContext } from "../../feautures/auth/authProvider";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";
import { HttpMethod } from "../../feautures/api/types";
import useIsAuthorize from "../../feautures/auth/hooks/useIsAuthorize";
import classes from './styles.module.scss'

const Auth = () => {
  
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { updateAuthKey } = useContext(authContext);
  const [makeRequest] = useBackendRequest<string>();
  const isAuth = useIsAuthorize();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {

    const handleClick = (e:Event) => {
      const target = e.target as HTMLButtonElement;
    isAuth && target.className.includes('authButton')? setIsDelete(!isDelete): setIsDelete(false)
    
  if (!isAuth) window.location.replace(
         "https://connect.deezer.com/oauth/auth.php?app_id=624064&redirect_uri=http://localhost:3000/favorite&perms=basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history"
       );
     };
   
  
     document.addEventListener("click", handleClick);
     return () => document.removeEventListener("click", handleClick);
  },[isAuth, isDelete])


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
       if (response){ const accessToken = response.split("=")[1].split("&");

        updateAuthKey(accessToken[0])}
      };
      fetchToken();
    }
  }, [code]);

  return (
    <div className={classes.authContainer}>
      <button className={classes.authButton} >{isAuth? 'Вийти': 'Увійти'}</button>
      {isDelete?
      <div className={classes.logOutMessage} onClick={() => updateAuthKey(null)} >Вийти з акаунту?</div> : null}
    </div>
  );
};

export default Auth;
