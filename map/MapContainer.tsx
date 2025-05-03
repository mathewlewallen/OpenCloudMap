import { useState, useEffect, forwardRef, ForwardedRef } from 'react'
import { useAppSelector } from '@/redux/hooks'
import Map from 'ol/Map'
import View from 'ol/View'
import { layerList } from '@/map/layers/layerList'

type MapContainerProps = {
    children: React.ReactNode
}

const MapContainer = forwardRef(function MapContainer(
    { children, ...props }: MapContainerProps,
    ref: ForwardedRef<Map>
) {
    const mapLayers = useAppSelector((state) => state.map.mapLayers)
    const [mapObj, setMapObj] = useState<Map>()

    ////////////////////////////////////////////////////////////////////////////////////////
    //
    // Initialize the map with default layers
    //
    ///////////////////////////////////////////////////////////////////////////////////////
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

    ////////////////////////////////////////////////////////////////////////////////////////
    //
    // Add and remove layers from the map
    //
    ////////////////////////////////////////////////////////////////////////////////////////
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
      }, [mapLayers]);

    return (
        <>
            <div className="mapContainer" id="map">
                {children}
            </div>
        </>
    )
})

export default MapContainer