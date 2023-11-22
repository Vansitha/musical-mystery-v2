import { useEffect, useState, useRef } from "react";

const AUTH_TOKEN_KEY = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";

export default function useSpotifyPlayerSetup() {
  const [deviceId, setDeviceId] = useState(null);
  const player = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const authObject = localStorage.getItem(AUTH_TOKEN_KEY);
      const accessToken = JSON.parse(authObject).access_token;
      const player = new window.Spotify.Player({
        name: "Musical Mystery Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      player.addListener("ready", async ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      const connected = await player.connect();
      if (connected) {
        console.log("connected");
        player.current = player;
      }
    };

    return () => {
      (async () => {
        await player?.disconnect();
      })();
      document.body.removeChild(script);
    };
  }, []);

  return deviceId;
}
