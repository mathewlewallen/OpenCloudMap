import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke } from "ol/style";
import { type Airspace, AirspaceType } from "@/map/types/airspace";
import { StyleFunction } from "ol/style/Style";

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!;
const GEOJSON_URL =`https://${projectId}.supabase.co/storage/v1/object/public/aerodata/airspaceRaw.json`;

const enumValues = Object.values(AirspaceType).filter((v) => typeof v === 'number') as number[];
const totalTypes = enumValues.length;

// StyleFunction: assign a distinct hue per AirspaceType
const airspaceStyleFn: StyleFunction = (feature) => {
  const typeCode = feature.get('type') as AirspaceType;
  const idx = enumValues.indexOf(typeCode);
  const hue = (idx / totalTypes) * 360;

  const fillColor = `hsla(${hue}, 75%, 50%, 0.3)`; // translucent fill
  const strokeColor = `hsl(${hue}, 75%, 40%)`;      // darker outline

  return new Style({
    fill: new Fill({ color: fillColor }),
    stroke: new Stroke({ color: strokeColor, width: 2 }),
  });
};

const source = new VectorSource({
  url: GEOJSON_URL,
  format: new GeoJSON({
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  })
})

// Create the VectorLayer with the style function
export const airspaceLayer = new VectorLayer({
  source,
  style: airspaceStyleFn,
});
