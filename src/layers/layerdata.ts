import { atom } from "jotai";

export const $layerAtom = atom([
  {
    id: 0,
    name: "Polygon",
    type: "geojson",

    order: 0,
    visible: true,
    data: "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json",
    config: {
      filled: true,
      stroked: true,
      extruded: true,
      wireframe: true,
      opacity: 0.8,
      getFillColor: [32, 160, 255],
      getLineColor: [0, 0, 0],
      getElevation: 30,
    },
  },
  {
    id: 1,
    name: "Point",
    order: 1,
    type: "geojson",
    visible: true,
    data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson",
    config: {
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: (f) => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
    },
  },
]);
export const layerdata = {
  layers: [
    {
      id: "0",
      name: "Layer 1",
      type: "geojson",
      visible: true,
      data: "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json",
      config: {
        filled: true,
        stroked: true,
        extruded: true,
        wireframe: true,
        opacity: 0.8,
        getFillColor: [32, 160, 255],
        getLineColor: [0, 0, 0],
        getElevation: 30,
      },
    },
    {
      id: "1",
      name: "Layer 2",
      type: "geojson",
      visible: true,
      data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson",
      config: {
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 2000,
        getPointRadius: (f) => 11 - f.properties.scalerank,
        getFillColor: [200, 0, 80, 180],
        // Interactive props
        pickable: true,
        autoHighlight: true,
      },
    },
  ],
};
