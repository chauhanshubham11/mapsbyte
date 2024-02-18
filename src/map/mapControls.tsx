import { $viewState } from "@/App";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { GrAdd } from "react-icons/gr";
import { FaExpand, FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { $baseMap, $fullMapView, $theme } from "@/store/atoms";
import { MdDarkMode } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MapControls() {
  const [viewState, setViewState] = useAtom($viewState);
  const [baseMap, setBaseMap] = useAtom($baseMap);
  const [theme, setTheme] = useAtom($theme);

  const [fullMapView, setFullMapView] = useAtom($fullMapView);
  return (
    <div className="absolute top-20 right-0 p-2 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <Button
              className="h-8 w-8 hover:bg-blue-500 dark:bg-black dark:text-white bg-white text-black "
              onClick={() => {
                // let prev = { ...viewState };
                // prev.zoom += 1;
                // setViewState(prev);

                const center = baseMap.getCenter();
                const zoom = baseMap.getZoom();
                setViewState({
                  latitude: center.lat(),
                  longitude: center.lng(),
                  zoom: zoom,
                });
              }}
            >
              <FaPlus className=" absolute" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Zoom In</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <Button
              className="h-8 w-8 hover:bg-blue-500 dark:bg-black dark:text-white bg-white text-black"
              onClick={() => {
                // let prev = { ...viewState };
                // prev.zoom -= 1;
                // setViewState(prev);
                const center = baseMap.getCenter();
                const zoom = baseMap.getZoom();
                setViewState({
                  latitude: center.lat(),
                  longitude: center.lng(),
                  zoom: zoom - 2,
                });
              }}
            >
              <FaMinus className=" absolute" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Zoom Out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <Button
              className="h-8 w-8 data-[state=active]:bg-blue-500  hover:bg-blue-500 dark:bg-black dark:text-white bg-white text-black "
              onClick={() => {
                setFullMapView(!fullMapView);
              }}
              data-state={fullMapView ? "active" : "inactive"}
            >
              <FaExpand className="absolute" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {!fullMapView ? "Full Map View" : "Normal View"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <Button
              className="h-8 w-8 data-[state=active]:bg-blue-500  hover:bg-blue-500 dark:bg-black dark:text-white bg-white text-black "
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              <MdDarkMode className="absolute" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Toggle Theme</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
