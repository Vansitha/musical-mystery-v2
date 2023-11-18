import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SpotifyProivder from "./context/SpotifyProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SpotifyProivder>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SpotifyProivder>
);
