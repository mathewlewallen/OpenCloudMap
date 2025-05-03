import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import rawNavaids from "@/map/data/navaidRaw.json";
import type { Navaid } from "@/map/types/navaid";
import { Fill } from 'ol/style'
import { Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle';

const navaidData = {
  type: "FeatureCollection" as const,
  features: (rawNavaids as Navaid[]).map((doc) => ({
    type: "Feature" as const,
    geometry: doc.geometry,
    properties: {
      id: doc._id,
      name: doc.name,
      type: doc.type,
      identifier: doc.identifier,
      country: doc.country,
      elevation: doc.elevation,
      elevationGeoid: doc.elevationGeoid,
      magneticDeclination: doc.magneticDeclination,
      alignedTrueNorth: doc.alignedTrueNorth,
      channel: doc.channel,
      frequency: doc.frequency,
      range: doc.range,
      hoursOfOperation: doc.hoursOfOperation,
      images: doc.images,
      remarks: doc.remarks,
      createdBy: doc.createdBy,
      updatedBy: doc.updatedBy,
    },
  })),
};

const pointStyle = new Style({
  image: new CircleStyle({
    radius: 1,
    fill: new Fill({ color: "black" }),
  }),
});

  const source = new VectorSource({
    features: new GeoJSON().readFeatures(navaidData, { 
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857" 
      }),
  });
  
  export const navaidLayer = new VectorLayer({
    source,
    style: [pointStyle],
  });

