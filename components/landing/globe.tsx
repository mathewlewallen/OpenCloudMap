"use client"

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from 'react-spring';

export function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [{ r }, api] = useSpring(() => ({
      r: 0,
      config: {
        mass: 1,
        tension: 280,
        friction: 40,
        precision: 0.001,
      },
    }));
    useEffect(() => {
      let phi = 0;
      let width = 0;
      const onResize = () => canvasRef.current && (width = (canvasRef.current as HTMLCanvasElement).offsetWidth)
      window.addEventListener('resize', onResize)
      onResize()
      const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
        devicePixelRatio: 2,
        width: 800,
        height: 800,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 0,
        mapSamples: 20000,
        mapBrightness: 12,
        baseColor: [1, 1, 1],
        markerColor: [0.1686, 0.651, 0.623],
        glowColor: [1, 1, 1],
        markers: [
          { location: [14.5995, 120.9842], size: 0.06 },
          { location: [19.076, 72.8777], size: 0.1 },
          { location: [23.8103, 90.4125], size: 0.05 },
          { location: [30.0444, 31.2357], size: 0.07 },
          { location: [39.9042, 116.4074], size: 0.08 },
          { location: [-23.5505, -46.6333], size: 0.1 },
          { location: [19.4326, -99.1332], size: 0.1 },
          { location: [40.7128, -74.006], size: 0.1 },
          { location: [34.6937, 135.5022], size: 0.05 },
          { location: [41.0082, 28.9784], size: 0.06 },
          { location: [28.0082, 22.9784], size: 0.06 },
        ],
        onRender: (state) => {
          // This prevents rotation while dragging
          if (!pointerInteracting.current) {
            // Called on every animation frame.
            // `state` will be an empty object, return updated params.
            phi += 0.005
          } 
          state.phi = phi + r.get()
          state.width = width * 2
          state.height = width * 2
        }
      })
      setTimeout(() => canvasRef.current && (canvasRef.current.style.opacity = '1'))
      return () => { 
        globe.destroy();
        window.removeEventListener('resize', onResize);
      }
    }, [])
    return <div style={{
      width: '100%',
      maxWidth: 600,
      aspectRatio: 1,
      margin: 'auto',
      position: 'relative',
    }}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          canvasRef.current && (canvasRef.current.style.cursor = 'grabbing');
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current && (canvasRef.current.style.cursor = 'grab');
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current && (canvasRef.current.style.cursor = 'grab');
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  }