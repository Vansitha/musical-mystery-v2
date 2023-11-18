import { useRef } from "react";
import { useSpotifyContext } from "../SpotifyProvider";
import {
  SpotifyApi,
  AuthorizationCodeWithPKCEStrategy,
} from "@spotify/web-api-ts-sdk";

export default function useSpotifyAuth() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_REDIRECT_TARGET;
  const scopes = ["streaming", "user-read-email", "user-read-private"];

  const { current: activeScopes } = useRef(scopes);
  const { setSpotifySdk } = useSpotifyContext();

  const initializeSpotifySdk = async () => {
    const auth = new AuthorizationCodeWithPKCEStrategy(
      clientId,
      redirectUrl,
      activeScopes
    );

    const internalSdk = new SpotifyApi(auth);

    try {
      const { authenticated } = await internalSdk.authenticate();

      if (authenticated) {
        setSpotifySdk(internalSdk);
      }
    } catch (e) {
      const error = e;
      if (
        error &&
        error.message &&
        error.message.includes("No verifier found in cache")
      ) {
        console.error(error);
      } else {
        console.error(e);
      }
    }
  };

  return initializeSpotifySdk;
}
