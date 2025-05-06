import { useState, useEffect, forwardRef } from 'react'
import { useAppSelector } from '@/redux/hooks'
import Map from 'ol/Map'
import View from 'ol/View'
import { layerList } from '@/map/layers/layerList'
import apply from 'ol-mapbox-style'

const MapContainer = forwardRef(function MapContainer(_, ref) {
    const mapLayers = useAppSelector((state) => state.map.mapLayers)
    const baseStyleUrl = useAppSelector((state) => state.map.baseStyleUrl)
    const [mapObj, setMapObj] = useState<Map>()

    useEffect(() => {
        // Get layers from global state to initially display on the map
        const initialLyrs = Object.entries(mapLayers)
            .map(([key, { visible }]) => {
                if (visible == true) {
                    return layerList[key]
                }
            })
            .filter((lyr) => !!lyr)

        // Create the map
        const map = new Map({
            target: 'map',
            view: new View({
                center: [50.90872, -20.39748],
                zoom: 4,
            }),
            layers: initialLyrs,
        })

        setMapObj(map)
    }, [])

    useEffect(() => {
        if (!mapObj) return;
      
        // Loop through every layer in your Redux state
        Object.entries(mapLayers).forEach(([key, { visible }]) => {
          const layer = layerList[key];
          if (layer) {
            // Instantly show/hide without tearing the layer down
            layer.setVisible(visible);
          }
        });
      }, [mapLayers, mapObj]);

      useEffect(() => {
        if (!mapObj) return
      
        mapObj.getLayers()
          .getArray()
          .filter(l => l.get('mapbox') === true)
          .forEach(l => mapObj.removeLayer(l))
      
        if (baseStyleUrl) {
          apply(mapObj as any, baseStyleUrl)
            .then(() => {
              mapObj.getLayers().getArray().forEach(l => {
                if ((l as any).getSource()?.getFormat) {
                  l.set('mapbox', true)
                }
              })
            })
            .catch(console.error)
        }
      }, [baseStyleUrl, mapObj])

    return (
        <div className="mapContainer" id="map" />
    )
})

export default MapContainer