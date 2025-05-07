import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Fill, Circle as CircleStyle } from 'ol/style'
import { Airport } from '@/map-utils/types/airport'

const GEOJSON_ENDPOINT = '/api/airports'

const rawAirports = await fetch(GEOJSON_ENDPOINT).then(res => res.json())

const airportData = {
  type: "FeatureCollection" as const,
  features: (rawAirports as Airport[]).map((doc) => ({
    type: "Feature" as const,
    geometry: doc.geometry,
    properties: {
      id: doc._id,
      name: doc.name,
      icaoCode: doc.icaoCode,
      iataCode: doc.iataCode,
      altIdentifier: doc.altIdentifier,
      type: doc.type,
      country: doc.country,
      elevation: doc.elevation,
      elevationGeoid: doc.elevationGeoid,
      trafficType: doc.trafficType,
      magneticDeclination: doc.magneticDeclination,
      ppr: doc.ppr,
      private: doc.private,
      skydiveActivity: doc.skydiveActivity,
      winchOnly: doc.winchOnly,
      services: doc.services,
      frequencies: doc.frequencies,
      runways: doc.runways,
      hoursOfOperation: doc.hoursOfOperation,
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
  features: new GeoJSON().readFeatures(airportData, { 
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857" 
  }),
});

export const airportLayer = new VectorLayer({
  source,
  style: [pointStyle],
});
