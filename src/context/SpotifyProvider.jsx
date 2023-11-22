import { useState, createContext, useContext } from "react";

export const SpotifyContext = createContext();

export default function SpotifyProivder({ children }) {
  const [sdk, setSdk] = useState(null);

  const setSpotifySdk = (newSdk) => {
    setSdk(newSdk);
  };

  return (
    <SpotifyContext.Provider value={{ sdk, setSpotifySdk }}>
      {children}
    </SpotifyContext.Provider>
  );
}

export const useSpotifyContext = () => {
  return useContext(SpotifyContext);
};
