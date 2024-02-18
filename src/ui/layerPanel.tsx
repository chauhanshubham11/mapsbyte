import { $mapLayers } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { atom, useAtom } from "jotai";
import { FaLayerGroup, FaFilter } from "react-icons/fa";
import { $layerAtom, layerdata } from "@/layers/layerdata";
import { FaRegEyeSlash, FaRegEye, FaRoute } from "react-icons/fa";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { $theme } from "@/store/atoms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export const $showLayerPanel = atom(true);

export const LayerPanel = () => {
  const [layerdata, setLayerdata] = useAtom($layerAtom);
  const [showLayerPanel, setShowLayerPanel] = useAtom($showLayerPanel);

  function showHideLayre(layerId: number) {
    let layerIndex = layerdata.findIndex((layer) => layer.id === layerId);
    console.log("layerIndex", layerIndex);
    let prevValue = layerdata[layerIndex].visible;
    let prev = [...layerdata];
    prev[layerIndex].visible = !prevValue;
    setLayerdata(prev);
  }
  //theme-container dark
  console.log("showLayerPanel", showLayerPanel);
  return (
    <div className={`absolute left-2 top-20  `}>
      <Button
        className="h-10 w-10  absolute right-[-50px] hover:bg-blue-500/50 dark:bg-black dark:text-white bg-white text-black border  "
        onClick={() => {
          setShowLayerPanel(!showLayerPanel);
        }}
      >
        {!showLayerPanel ? (
          <LuPanelLeftOpen className="cursor-pointer  text-2xl absolute" />
        ) : (
          <LuPanelRightOpen className="cursor-pointer  text-2xl absolute" />
        )}
      </Button>

      {showLayerPanel ? (
        <Tabs defaultValue="layers" className="w-[20vw] ">
          <TabsList className=" w-[100%] flex justify-between p-2   ">
            <header className="dark:text-white text-black ">Layer Panel</header>
            <div>
              <TabsTrigger value="layers" className="border">
                <FaLayerGroup />
              </TabsTrigger>
              <TabsTrigger value="routes" className="border">
                <FaRoute />
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="layers">
            <Card className="p-0.5 flex-1">
              <CardContent className=" flex flex-col gap-2 p-2">
                {layerdata.map((layer) => {
                  return (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger
                          // onDoubleClick={() => {
                          //   showHideLayre(layer.id);
                          // }}
                          key={layer.id}
                          className="flex flex-row  p-2 rounded-sm cursor-pointer hover:bg-blue-500/50 border"
                        >
                          <div className="flex w-full justify-between">
                            <Label htmlFor={layer.name}>{layer.name}</Label>
                            {!layer.visible ? (
                              <FaRegEyeSlash
                                className="cursor-pointer mx-2 "
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHideLayre(layer.id);
                                }}
                              />
                            ) : (
                              <FaRegEye
                                className="cursor-pointer mx-2 "
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHideLayre(layer.id);
                                }}
                              />
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>CONTENT HERE</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </CardContent>
              {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
            </Card>
          </TabsContent>
          <TabsContent value="routes">
            <Card className="p-0.5 flex-1">
              <CardContent className="space-y-0.5 flex flex-col gap-2 p-2">
                {layerdata.map((layer) => {
                  return (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger
                          key={layer.id}
                          className="flex flex-row  p-2 rounded-sm cursor-pointer hover:bg-blue-500 border"
                        >
                          <div className="flex w-full justify-between">
                            <Label htmlFor={layer.name}>{layer.name}</Label>
                            {!layer.visible ? (
                              <FaRegEyeSlash
                                className="cursor-pointer mx-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHideLayre(layer.id);
                                }}
                              />
                            ) : (
                              <FaRegEye
                                className="cursor-pointer mx-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHideLayre(layer.id);
                                }}
                              />
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>CONTENT HERE</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </CardContent>
              {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
            </Card>
          </TabsContent>
        </Tabs>
      ) : null}
    </div>
  );
};
