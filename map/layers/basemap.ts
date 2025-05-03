import { Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM";

export const osm = new TileLayer({
  source: new OSM(),
  properties: { name: "osm" },
  zIndex: 0,
});
