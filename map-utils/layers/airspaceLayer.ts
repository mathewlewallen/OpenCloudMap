import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Fill, Stroke } from 'ol/style'
import { Airspace, AirspaceType } from '@/map-utils/types/airspace'
import { StyleFunction } from 'ol/style/Style'

const GEOJSON_ENDPOINT = '/api/airspaces'

const rawAirspaces = await fetch(GEOJSON_ENDPOINT).then(res => res.json())

const airspaceData = {
  type: "FeatureCollection" as const,
  features: (rawAirspaces as Airspace[]).map((doc) => ({
    type: "Feature" as const,
    geometry: doc.geometry,
    properties: {
      id: doc._id,
      name: doc.name,
      dataIngestion: doc.dataIngestion,
      type: doc.type as AirspaceType,
      icaoClass: doc.icaoClass,
      activity: doc.activity,
      onDemand: doc.onDemand,
      onRequest: doc.onRequest,
      byNotam: doc.byNotam,
      specialAgreement: doc.specialAgreement,
      requestCompliance: doc.requestCompliance,
      centrePoint: doc.centrePoint,
      country: doc.country,
      upperLimit: doc.upperLimit,
      lowerLimit: doc.lowerLimit,
      upperLimitMax: doc.upperLimitMax,
      lowerLimitMin: doc.lowerLimitMin,
      frequencies: doc.frequencies,
      hoursOfOperation: doc.hoursOfOperation,
      activeFrom: doc.activeFrom,
      activeUntil: doc.activeUntil,
      remarks: doc.remarks,
      createdBy: doc.createdBy,
      updatedBy: doc.updatedBy,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    },
  })),
};

const enumValues = Object.values(AirspaceType).filter((v) => typeof v === 'number') as number[];
const totalTypes = enumValues.length;

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
  features: new GeoJSON().readFeatures(airspaceData, { 
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  })
})

export const airspaceLayer = new VectorLayer({
  source,
  style: airspaceStyleFn,
});