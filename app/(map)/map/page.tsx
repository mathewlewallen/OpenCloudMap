'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Layers as LayersIcon } from 'lucide-react';
import { LayersModal } from '@/map/LayersModal';
import MapContainer from '@/map/MapContainer';

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="relative flex h-screen w-full">
      {/* Toggle Sidebar Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-20"
        onClick={() => setSidebarOpen(true)}
      >
        <LayersIcon className="h-6 w-6" />
      </Button>

      {/* Sidebar for layer controls */}
      <LayersModal opened={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Map renders full viewport behind sidebar */}
      <div className="flex-1">
        <MapContainer />
      </div>
    </main>
  );
}