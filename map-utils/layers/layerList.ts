import { osm } from "@/map-utils/layers/basemap"; 
import { airspaceLayer } from "@/map-utils/layers/airspaceLayer";
import { LayerObjList } from "@/redux/slices/mapSlice";
import { navaidLayer } from "@/map-utils/layers/navaidLayer";
import { airportLayer } from "@/map-utils/layers/airportLayer";

export const layerList: LayerObjList = {
  osm: osm,
  airspaces: airspaceLayer,
  airports: airportLayer,
  navaids: navaidLayer,
};
