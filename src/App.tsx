import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@/components/ui/button";

import "./App.css";
import { Deckgl } from "./deckgl/deckgl";
import { atom, useAtom } from "jotai";
import { MapControls } from "./map/mapControls";
import { LayerPanel } from "./ui/layerPanel";
import { $fullMapView, $theme } from "./store/atoms";
import { GooglePlacesSearchInput } from "./ui/googlePlace";
export const $viewState = atom({
  longitude: 78.4,
  latitude: 24.8,
  zoom: 4,
});
export const $mapLayers = atom([]);
function App() {
  const [fullMapView, setFullMapView] = useAtom($fullMapView);
  const [theme, setTheme] = useAtom($theme);
  return (
    <div className={`${theme}`}>
      <Deckgl />
      <MapControls />

      {!fullMapView ? (
        <>
          <LayerPanel /> <GooglePlacesSearchInput />
        </>
      ) : null}
    </div>
  );
}

export default App;
