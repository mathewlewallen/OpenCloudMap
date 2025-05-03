import { createSlice } from "@reduxjs/toolkit";
import VectorTileLayer from "ol/layer/VectorTile";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import OSM from "ol/source/OSM";
import { Geometry } from "ol/geom";

interface LayerProperties {
  visible: boolean;
  layerName?: string;
}

export type LayerPropsList = {
  [layerName: string]: LayerProperties;
};

type VLyr = VectorTileLayer | VectorLayer<VectorSource<Feature<Geometry>>>;

type Layer = VLyr | TileLayer<OSM>;

export type LayerObjList = {
  [layerName: string]: Layer;
};

interface MapState {
  mapLayers: LayerPropsList;
  viewProperties?: {
    zoom?: number;
    center?: [number, number];
    rotation?: number;
    pitch?: number;
  };
}

const initialState: MapState = {
  mapLayers: {
    osm: { visible: true },
    airports: { visible: true, layerName: "Airports" },
    airspaces: { visible: true, layerName: "Airspaces" },
    navaids: { visible: true, layerName: "Navaids" },
  },
};

export const mapSlice = createSlice({
  name: "layers",
  initialState,
  reducers: {
    addLayerToMap: (state, action) => {
      const lyrName = action.payload;
      state.mapLayers[lyrName].visible = true;
    },
    removeLayerFromMap: (state, action) => {
      const lyrName = action.payload;
      state.mapLayers[lyrName].visible = false;
    },
  },
});

export const { addLayerToMap, removeLayerFromMap } = mapSlice.actions;

export default mapSlice.reducer;
