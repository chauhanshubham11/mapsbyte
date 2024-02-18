export type MapProvider = "google" | "mapbox" | string;

export interface MapStyle {
  baseProvider: MapProvider;
  baseStyle: "light-street" | "dark-street" | "satellite" | string;
}
