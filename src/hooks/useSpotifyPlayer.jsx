import { useEffect, useRef, useState } from "react";
import { useSpotifyContext } from "../context/SpotifyProvider";
import useSpotifyPlayerSetup from "./useSpotifyPlayerSetup";

const PLAYLIST_ID = "4s0CRjEIocPbeWyll7vAaV";

export default function useSpotifyPlayer() {
  const { sdk } = useSpotifyContext();
  const deviceId = useSpotifyPlayerSetup();
  const [isLoading, setIsLoading] = useState(true);
  const tracks = useRef([]);

  useEffect(() => {
    (async () => {
      if (sdk?.player && deviceId) {
        await sdk.player.transferPlayback([deviceId], false);
        const res = await sdk.playlists.getPlaylist(PLAYLIST_ID);

        const playListTracks = res.tracks.items;
        const cleanedTracks = playListTracks.map((trackInPlayList) => {
          const { id, name } = trackInPlayList.track;

          const adjustedName = name.includes("(")
            ? name.slice(0, name.indexOf("("))
            : name;

          return { id, name: adjustedName };
        });

        tracks.current = cleanedTracks;
        setIsLoading(false);
      }
    })();
  }, [sdk, deviceId]);

  async function pause() {
    if (isLoading) return;
    await sdk.player.pausePlayback(deviceId);
  }

  async function play(track) {
    if (isLoading) return;
    const uri = `spotify:track:${track}`;
    await sdk.player.startResumePlayback(deviceId, undefined, [uri]);
  }

  function getRandomTracks() {
    if (isLoading) return;

    const getRandomIndex = () =>
      Math.floor(Math.random() * tracks.current.length);

    const randomTracks = Array.from(
      { length: 3 },
      () => tracks.current[getRandomIndex()]
    );

    return randomTracks;
  }

  async function getProgress() {
    const { progress_ms } = await sdk.player.getPlaybackState();
    const seconds = progress_ms / 1000;
    return seconds;
  }

  return { isLoading, pause, play, getRandomTracks, getProgress };
}
