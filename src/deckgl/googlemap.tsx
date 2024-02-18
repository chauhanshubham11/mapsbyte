import { useEffect, useState } from "react";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { $viewState } from "@/App";
import { useAtom } from "jotai";
import { $baseMap } from "@/store/atoms";
export const GoogleMap = ({ layers }) => {
  const [map, setMap] = useState();
  const [baseMap, setBaseMap] = useAtom($baseMap);
  const [viewState, setViewState] = useAtom($viewState);

  function createMap(viewState: ViewState) {
    const googleMap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        center: {
          lat: viewState.latitude ?? INITIAL_VIEW_STATE.latitude ?? 0,
          lng: viewState.longitude ?? INITIAL_VIEW_STATE.longitude ?? 0,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: (viewState.zoom ?? INITIAL_VIEW_STATE.zoom ?? 0) + 1,

        fullscreenControl: false,

        // styles: [
        //   { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        //   { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        //   { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        //   {
        //     featureType: "administrative.locality",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "poi",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "geometry",
        //     stylers: [{ color: "#263c3f" }],
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#6b9a76" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry",
        //     stylers: [{ color: "#38414e" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry.stroke",
        //     stylers: [{ color: "#212a37" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#9ca5b3" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry",
        //     stylers: [{ color: "#746855" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry.stroke",
        //     stylers: [{ color: "#1f2835" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#f3d19c" }],
        //   },
        //   {
        //     featureType: "transit",
        //     elementType: "geometry",
        //     stylers: [{ color: "#2f3948" }],
        //   },
        //   {
        //     featureType: "transit.station",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "geometry",
        //     stylers: [{ color: "#17263c" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#515c6d" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.stroke",
        //     stylers: [{ color: "#17263c" }],
        //   },
        // ],
      }
    );

    window.googleMap = googleMap;
    return googleMap;
  }
  function createDeckOverlay(map: google.maps.Map) {
    const overlay = new GoogleMapsOverlay({});

    overlay.setMap(map);

    overlay.setProps({
      layers: [],
    });
    return { map, overlay };
  }

  useEffect(() => {
    if (!window.googleMap) {
      if (window.google) {
        let googleMap = createDeckOverlay(createMap(viewState));
        setMap(googleMap);
        setBaseMap(googleMap.map);
      } else {
        if (!window.mapTarget) {
          console.log("loading google map script");
          window.mapTarget = new EventTarget();
          window.initMap = () => {
            console.log("init map");
            window.mapTarget.dispatchEvent(new CustomEvent("map-load"));
          };
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCC2Mgbaj4YH0g0ltMPGBdXwULwG9hgvkY"}&v=weekly&libraries=places&callback=initMap`;
          script.async = true;
          document.head.appendChild(script);
        }

        window.mapTarget.addEventListener("map-load", () => {
          if (!window.googleMap) {
            let googleMap = createDeckOverlay(createMap(viewState));
            setMap(googleMap);
            setBaseMap(googleMap.map);
          }
        });
      }
    }

    return () => {
      map?.overlay.finalize();
      if (window.googleMap) {
        window.googleMap = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log("map is", map);
    if (!map) {
      return;
    }

    //map.map.setZoom((viewState?.zoom ?? 0) + 1);
    map.map.setZoom((viewState?.zoom ?? 0) + 1);

    // set center from viewState
    if (viewState.latitude && viewState.longitude) {
      map.map.setCenter({
        lat: viewState.latitude,
        lng: viewState.longitude,
      });
      return;
    }

    // keep previous center
    const center = map.map.getCenter();
    if (center) {
      map.map.setCenter({
        lat: center.lat(),
        lng: center.lng(),
      });
    }
  }, [viewState, map]);
  useEffect(() => {
    console.log("layera are", layers, map);
    map?.overlay.setProps({
      layers: [...layers],
    });
  }, [map, layers]);

  return (
    <div
      id="map"
      style={{
        height: "100%",
      }}
    ></div>
  );
};
