import React, { useEffect } from "react";
import useSpotifyAuth from "./hooks/useSpotifyAuth";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AUTH_TOKEN_KEY = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";

export default function PrivateRoutes() {
  // if accesTokne not there redirect to login
  // if accessToken there request for a new sdk instance
  const initializeSpotifySdk = useSpotifyAuth();
  const accessTokenObj = localStorage.getItem(AUTH_TOKEN_KEY);
  const navigate = useNavigate();

  useEffect(() => {
    async function triggerAuth() {
      if (accessTokenObj) {
        await initializeSpotifySdk();
      } else {
        navigate("/", { replace: true });
      }
    }
    triggerAuth();
  }, []);

  return <Outlet />;
}
