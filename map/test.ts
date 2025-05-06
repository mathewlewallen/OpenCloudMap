// src/components/MapContainer.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import Map from 'ol/Map'
import View from 'ol/View'
import { layerList } from '@/map/layers/layerList'
import { applyStyle } from 'ol-mapbox-style'

export default function MapContainer() {
  const mapLayers    = useAppSelector((s) => s.map.mapLayers)
  const baseStyleUrl = useAppSelector((s) => s.map.baseStyleUrl)
  const [mapObj, setMapObj] = useState<Map>()

  // initialize
  useEffect(() => {
    const initial = Object.entries(mapLayers)
      .filter(([, { visible }]) => visible)
      .map(([key]) => layerList[key])
      .filter(Boolean)

    const map = new Map({
      target: 'map',
      view: new View({ center: [50.90872, -20.39748], zoom: 4 }),
      layers: initial,
    })
    setMapObj(map)
  }, [])

  // feature toggles
  useEffect(() => {
    if (!mapObj) return
    Object.entries(mapLayers).forEach(([key, { visible }]) => {
      const lyr = layerList[key]
      if (lyr) lyr.setVisible(visible)
    })
  }, [mapLayers, mapObj])

  // base-map style
  useEffect(() => {
    if (!mapObj) return

    // remove old style layers
    mapObj.getLayers()
      .getArray()
      .filter((l) => l.get('mapbox') === true)
      .forEach((l) => mapObj.removeLayer(l))

    // apply new style if any
    if (baseStyleUrl) {
      applyStyle(mapObj, baseStyleUrl)
        .then(() => {
          mapObj.getLayers().getArray().forEach((l) => {
            if ((l as any).getSource()?.getFormat) {
              l.set('mapbox', true)
            }
          })
        })
        .catch(console.error)
    }
  }, [baseStyleUrl, mapObj])

  return <div id="map" className="mapContainer w-full h-full" />
}
