/** @format */

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authContext } from "../../feautures/auth/authProvider";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";
import { HttpMethod } from "../../feautures/api/types";
import useIsAuthorize from "../../feautures/auth/hooks/useIsAuthorize";

const Auth = () => {
  
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { updateAuthKey } = useContext(authContext);
  const [makeRequest] = useBackendRequest<string>();
  const isAuth = useIsAuthorize();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const handleClick = () => {
  isAuth? setIsDelete(!isDelete): window.location.replace(
       "https://connect.deezer.com/oauth/auth.php?app_id=624064&redirect_uri=http://localhost:3000/favorite&perms=basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history"
     );
   };
 

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
        const accessToken = response.split("=")[1].split("&");

        updateAuthKey(accessToken[0]);
      };
      fetchToken();
    }
  }, [code]);

  return (
    <div>
      <button onClick={handleClick}>{isAuth? 'Вийти': 'Увійти'}</button>
      {isDelete?
      <div onClick={() => updateAuthKey(null)} >Вийти з акаунту?</div> : null}
    </div>
  );
};

export default Auth;
