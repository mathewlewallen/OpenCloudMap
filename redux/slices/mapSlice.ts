import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  baseStyleUrl: string | null;
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
  baseStyleUrl: null,
};

export const mapSlice = createSlice({
  name: "layers",
  initialState,
  reducers: {
    addLayerToMap(state, action: PayloadAction<string>) {
      const lyrName = action.payload;
      state.mapLayers[lyrName].visible = true;
    },
    removeLayerFromMap(state, action: PayloadAction<string>) {
      const lyrName = action.payload;
      state.mapLayers[lyrName].visible = false;
    },
    setBaseStyleUrl(state, action: PayloadAction<string | null>) {
      state.baseStyleUrl = action.payload;
    },
  },
});

export const { addLayerToMap, removeLayerFromMap, setBaseStyleUrl } = mapSlice.actions;

export default mapSlice.reducer;
