import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import type { Navaid } from "@/map/types/navaid";
import { Fill } from 'ol/style'
import { Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle';

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!;
const GEOJSON_URL =`https://${projectId}.supabase.co/storage/v1/object/public/aerodata/navaidRaw.json`;

const pointStyle = new Style({
  image: new CircleStyle({
    radius: 1,
    fill: new Fill({ color: "black" }),
  }),
});

const source = new VectorSource({
  url: GEOJSON_URL,
  format: new GeoJSON({
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  })
})

export const navaidLayer = new VectorLayer({
  source,
  style: [pointStyle],
});

