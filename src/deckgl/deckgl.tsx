import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import DeckGL, { GeoJsonLayer, ArcLayer } from "deck.gl";
import { MapStyle } from "./style";
import { useAtom } from "jotai";
import { $mapLayers, $viewState } from "@/App";

import { $layerAtom } from "@/layers/layerdata";
import { GoogleMap } from "./googlemap";

const baseStyles: Record<MapStyle["baseStyle"], string> = {
  "dark-street": "mapbox://styles/mapbox/dark-v10",
  "light-street": "mapbox://styles/mapbox/outdoors-v10",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
};

export function Deckgl() {
  const [layerdata, setLayerdata] = useAtom($layerAtom);
  const onClick = (info) => {
    if (info.object) {
      // eslint-disable-next-line
      alert(
        `${info.object.properties.name} (${info.object.properties.abbrev})`
      );
    }
  };
  console.log("layerData", layerdata);

  const layers = [
    ...layerdata
      .sort((a, b) => a.order - b.order)
      .map((layer) => {
        return new GeoJsonLayer({
          id: layer.id,
          data: layer.data,
          // Styles
          // filled: layer.config.filled,
          // stroked: layer.config.stroked,
          // extruded: layer.config.extruded,
          // wireframe: layer.config.wireframe,
          // opacity: layer.config.opacity,
          // getFillColor: layer.config.getFillColor,
          // getLineColor: layer.config.getLineColor,
          // getElevation: layer.config.getElevation,
          // Interactive props
          visible: layer.visible,
          pickable: true,
          autoHighlight: true,
          ...layer.config,
        });
      }),
    // new VehicleLayer({
    //   id: "vehicle-layer",
    //   data: [
    //     {
    //       latitude: 53.43185529968051,
    //       longitude: -2.9577037905967574,
    //       bearing: -51.94099460927194,
    //       vehilceType: VehicleType.TransitBus,
    //     },
    //     {
    //       latitude: 53.431755073582494,
    //       longitude: -2.9578708705967136,
    //       bearing: -51.94099460927194,
    //       vehilceType: VehicleType.Tram,
    //     },
    //   ],
    //   dimensionMode: "3D",
    //   getColor: [238, 255, 203],
    //   getPosition: (vehicle) => [vehicle.longitude, vehicle.latitude],
    //   getBearing: (vehicle) => vehicle.bearing,
    //   getVehicleType: (vehicle) => vehicle.vehilceType,
    // }),
  ];

  const [viewState, setViewState] = useAtom($viewState);
  const [mapLayers, setMapLayers] = useAtom($mapLayers);

  return (
    <DeckGL
      initialViewState={viewState}
      style={{
        width: "100%",
        height: "100%",

        overflow: "hidden",
      }}
      controller={true}
      //layers={layers}
      //ContextProvider={MapContext.Provider}
    >
      {/* <Map
        mapboxAccessToken={
          "pk.eyJ1IjoibmlraGlsc2FyYWYiLCJhIjoiY2xlc296YjRjMDA5dDNzcXphZjlzamFmeSJ9.7ZDaMZKecY3-70p9pX9-GQ"
        }
        // initialViewState={{
        //   longitude: 78.4,
        //   latitude: 24.8,
        //   zoom: 14,
        // }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={baseStyles["light-street"]}
      >
        <NavigationControl position="top-left" />
        <FullscreenControl position="top-left" />
      </Map> */}
      <GoogleMap viewState={viewState} layers={layers} />
    </DeckGL>
  );
}

/* global document */
