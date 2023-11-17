import { useRef } from "react";
import { useSpotifyContext } from "../SpotifyProvider";
import {
  SpotifyApi,
  AuthorizationCodeWithPKCEStrategy,
} from "@spotify/web-api-ts-sdk";

export default function useSpotifyAuth() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_REDIRECT_TARGET;
  const scopes = ["streaming", "user-read-email"];

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
        console.error(
          "If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).",
          error
        );
      } else {
        console.error(e);
      }
    }
  };

  return initializeSpotifySdk;
}
