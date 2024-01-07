/** @format */

import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { LOCAL_STORAGE_AUTH_KEY } from "../../feautures/auth/constants";
import { authContext } from "../../feautures/auth/authProvider";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";
import { HttpMethod } from "../../feautures/api/types";

const Auth = () => {
  const { authKey } = useContext(authContext);

  const handleClick = () => {
    window.location.replace(
      "https://connect.deezer.com/oauth/auth.php?app_id=624064&redirect_uri=http://localhost:3000/favorite&perms=basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history"
    );
  };

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { updateAuthKey } = useContext(authContext);
  const [makeRequest] = useBackendRequest<string>();

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
      <button onClick={handleClick}>Log in</button>
    </div>
  );
};

export default Auth;
