import { osm } from "@/map-utils/layers/basemap"; 
import { airspaceLayer } from "@/map-utils/layers/airspaceLayer";
import { LayerObjList } from "@/redux/slices/mapSlice";
import { navaidLayer } from "./navaidLayer";
import { airportLayer } from "./airportLayer";

export const layerList: LayerObjList = {
  osm: osm,
  airspaces: airspaceLayer,
  airports: airportLayer,
  navaids: navaidLayer,
};
