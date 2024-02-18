import { $viewState } from "@/App";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { fitBounds } from "@math.gl/web-mercator";

export function GooglePlacesSearchInput() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [viewState, setViewState] = useAtom($viewState);
  let googleMapsPromise;

  useEffect(() => {
    function subscribe() {
      const searchBox = new google.maps.places.SearchBox(ref.current);
      searchBox.addListener("places_changed", () => {
        const [place] = searchBox.getPlaces();
        let viewport = fitBounds({
          bounds: [
            // [place.view  coordinates[0][0][0], bounds.coordinates[0][0][1]],
            // [bounds.coordinates[0][2][0], bounds.coordinates[0][2][1]],
            [
              place.geometry.viewport.getNorthEast().lng(),
              place.geometry.viewport.getNorthEast().lat(),
            ],
            [
              place.geometry.viewport.getSouthWest().lng(),
              place.geometry.viewport.getSouthWest().lat(),
            ],
          ],
          width: window.innerWidth,
          height: window.innerHeight,
        });

        // map.setViewState(viewport);
        setViewState({
          ...viewport,
          pitch: viewState.pitch,
        });

        setSelectedPlace(place);
      });
    }
    if (window.google) {
      subscribe();
    } else if (window.mapTarget) {
      window.mapTarget.addEventListener("map-load", () => {
        // if (!window.googleMap) {
        // setMap(createDeckOverlay(createMap(viewState)));
        // }
        subscribe();
      });
    } else {
      googleMapsPromise ??= new Promise((resolve) => {
        const script = document.createElement("script");
        // script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyByraLO7WVzW-9K-H6NErKftVydyJK2058"}&v=weekly&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          resolve({});
        };

        document.head.appendChild(script);
      });

      googleMapsPromise.then(() => subscribe());
    }
  }, [setSelectedPlace, setViewState]);
  const ref = useRef(null);
  return (
    <Input
      className="w-80 absolute top-2 left-[40%] rounded-md dark:text-white "
      placeholder="Search a region"
      ref={ref}
    />
  );
}
