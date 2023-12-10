import { useEffect, useState } from "react";

const AUTH_TOKEN_KEY = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";

/*
 * Injects the Spotify Player SDK directly into the dom, registers player
 * with spotify API and returns the registered device id.
 */
export default function useSpotifyPlayerSetup() {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    let spotifyPlayer = null;
    if (spotifyPlayer) return;
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

      player.addListener("player_state_changed", (state) => {
        console.log(state);
      });
      
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      const connected = await player.connect();
      if (connected) {
        spotifyPlayer = player;
      }
    };

    return () => {
      console.log(spotifyPlayer);
      document.body.removeChild(script);
    };
  }, []);

  return deviceId;
}
