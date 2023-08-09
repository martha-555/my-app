/** @format */

import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { LOCAL_STORAGE_AUTH_KEY } from "../../feautures/auth/constants";
import { authContext } from "../../feautures/auth/authProvider";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";
import { HttpMethod } from "../../feautures/api/types";

const Auth = () => {
  const handleClick = () => {
    window.location.replace(
      "https://connect.deezer.com/oauth/auth.php?app_id=590024&redirect_uri=http://localhost:3000/login&perms=basic_access,email"
    );
  };

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { updateAuthKey } = useContext(authContext);
  const [makeRequest] = useBackendRequest<string>();

  useEffect(() => {
    if (code) {
      const fetchToken = async () => {
        const response = await makeRequest({
          payload: {
            url: `https://connect.deezer.com/oauth/access_token.php?app_id=590024&secret=6ffab1c4182c63b036ce9d37843ace1e&code=${code}`,
            method: HttpMethod.GET,
          },
        }, async (response) => response.text());

        if (response === "wrong code") return;
        const accessToken = response.split("=")[1].split("&");

        updateAuthKey(accessToken[0]);
      };
      fetchToken();
    }
  }, []);
  return (
    <div>
      <button onClick={handleClick}>Log in</button>
    </div>
  );
};

export default Auth;
