import { useEffect } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import useSpotifyPlayerSetup from "./useSpotifyPlayerSetup";

export default function useSpotifyPlayer() {
  const { sdk } = useSpotifyContext();
  const deviceId = useSpotifyPlayerSetup();

  useEffect(() => {
    async function play() {
    }
    play();
  }, [sdk, deviceId]);
}
